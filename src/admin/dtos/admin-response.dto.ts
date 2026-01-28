import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  ValidateNested,
} from 'class-validator';
import { AccessLevels, AdminRoles } from '../enums/admin.enum';
import { Type } from 'class-transformer';
import { AdminPermissionLevelsDTO } from './admin-permission-levels.dto';

export class AdminResponseDTO {
  @IsNotEmpty()
  @IsOptional()
  user_id?: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  @Matches(/^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/, {
    message: 'Invalid email address format',
  })
  email?: string;

  // @IsOptional()
  // phoneNumber: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(AdminRoles, { each: true })
  roles?: AdminRoles[];

  @IsOptional()
  @IsEnum(AccessLevels, { each: true })
  accessLevels?: AccessLevels[];

  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPermissionLevelsDTO)
  admin_permissions?: AdminPermissionLevelsDTO[];
}
