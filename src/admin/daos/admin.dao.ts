import { Model } from "mongoose";
import { BaseDAO } from "src/common/baseDAO";
import {Admin, AdminDocument} from "src/admin/schemas/admin.schema"
import { AdminDTO } from "../dtos/admin.dto";
import { InjectModel } from "@nestjs/mongoose";

export class AdminDAO extends BaseDAO<AdminDocument, AdminDTO> {
    constructor(
        @InjectModel(Admin.name) userModel: Model<AdminDocument>
    ) {
        super(userModel);
    }

    async findByGlobalId(user_id: string) {
        const result =  await this.findAllWithoutPagination({user_id}, ['*']);
        console.log("FOUND ADMIN BY GLOBAL ID: ", result);
        return result.data[0];
    }
}