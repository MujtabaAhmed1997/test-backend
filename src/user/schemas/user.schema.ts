import { BaseSchema } from "src/common/baseSchema";
import { UserDTO } from "../dtos/user.dto";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { ChatBotTokensDTO } from "../dtos/user.dto";
import { Gender } from "../enums/user.enum";
import { Role } from "../enums/user.enum";
import { Document } from "mongoose";


@Schema({timestamps: true})
export class User extends BaseSchema implements UserDTO {
    @Prop({ type: String, required: false })
    user_id: string;
    
    @Prop({ type: String, required: false })
    full_name: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: false, select: false })
    password?: string;
    
    @Prop({ type: String, enum: Gender, default: Gender.OTHER })
    gender: Gender;

    @Prop({ type: Date, required: false })
    date_of_birth?: Date;

    @Prop({ type: Number, required: false })
    user_age?: number;

    @Prop({ type: String, required: false })
    user_mood?: string;

    @Prop({ type: String, required: false })
    private_key?: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;

    @Prop({ type: Object, required: false })
    chat_bot_tokens?: ChatBotTokensDTO;

    @Prop({ type: Boolean, default: false })
    is_account_deleted?: boolean; 

    @Prop({ type: Boolean, default: false })
    is_profile_complete?: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)