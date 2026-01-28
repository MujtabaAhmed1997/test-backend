import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AdminDTO } from '../dtos/admin.dto';

import { Document } from 'mongoose';
import { AccessLevels, AdminRoles } from '../enums/admin.enum';
import { AccountStatus } from 'src/user/enums/user.enum';
import { AdminPermissionLevelsDTO } from '../dtos/admin-permission-levels.dto';
import { BaseSchema } from 'src/common/baseSchema';

@Schema({ timestamps: true })
export class Admin extends BaseSchema implements AdminDTO {
  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({ type: String, required: false, default: null })
  firstName: string;

  @Prop({ type: String, required: false, default: null })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: [String], default: [AdminRoles.ADMIN] })
  roles: AdminRoles[];

  @Prop({ default: [] })
  accessLevels: AccessLevels[];

  @Prop({ default: [] })
  admin_permissions?: AdminPermissionLevelsDTO[];

  @Prop({ type: String, default: AccountStatus.ACTIVE })
  account_status?: AccountStatus;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);
