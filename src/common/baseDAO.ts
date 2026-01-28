import { Document, Model } from 'mongoose';

interface paginationMetaData {
  total: number;
  page: number;
  perPage: number;
  lastPage: number,
  hasNext: boolean;
  hasPrev: boolean;
}

export interface paginatedData<T> {
  data: T[];
  metadata: paginationMetaData;
}

type DTOCreate<T> = Pick<T, keyof T>;

export abstract class BaseDAO<T extends Document, U> {
  protected constructor(protected readonly model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    const document = await this.model.findById(id).select('-__v').lean().exec();

    if (!document) {
      throw new Error('No data exist for this id!');
    }

    const doc: any = document;
    doc.id = doc._id.toString();
    delete doc._id;
    return doc as T;
  }

  async create(data: DTOCreate<U>): Promise<T> {
    const response = await this.model.create(data as any);

    if (!response) {
      throw new Error('Error while creating document');
    }
    
    const doc = Array.isArray(response) ? response[0] : response;
    const { _id, __v, ...result } = doc.toObject();
    (result as any).id = _id.toString();
    return result as unknown as T;
  }

  async findAllWithoutPagination(
    filter: Record<string, any>,
    selectFields?: (keyof T | '*')[],
    sort = -1,
  ) {
    if (filter.hasOwnProperty('id')) {
      filter['_id'] = filter['id'];
      delete filter['id'];
    }

    let fieldsToSelect: string[] = ['_id', 'createdAt', 'updatedAt'];

    if (selectFields && selectFields.length > 0) {
      if (selectFields.includes('*')) {
        fieldsToSelect = Object.keys(this.model.schema.paths);
      } else {
        fieldsToSelect = [...fieldsToSelect, ...(selectFields as string[])];
      }
    }

    const total = await this.model.countDocuments(filter).exec();
    const data = await this.model
      .find(filter)
      .select(fieldsToSelect.join(' '))
      .select('-__v')
      .sort({ createdAt: sort as any })
      .lean()
      .exec();

    const mappedData = data.map((item: any) => {
      const { _id, ...rest } = item;
      return { id: _id.toString(), ...rest };
    });

    return {
      data: mappedData,
      metadata: {
        total,
        page: 1,
        perPage: total,
        lastPage: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
}
