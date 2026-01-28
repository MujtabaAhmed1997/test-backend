import { BaseDAO } from "src/common/baseDAO";
import {UserDocument, User} from "src/user/schemas/user.schema"
import { UserDTO } from "../dtos/user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class UserDAO extends BaseDAO<UserDocument, UserDTO> {
    constructor(
        @InjectModel(User.name) userModel: Model<UserDocument>
    ) {
        super(userModel);
    }


    async findByGlobalId(user_id: string) {
        const result = await this.findAllWithoutPagination({user_id}, ['*'])
        return result.data[0];
    }
}