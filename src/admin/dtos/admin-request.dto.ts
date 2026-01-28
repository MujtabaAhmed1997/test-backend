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

export class AdminRequestDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  @Matches(/^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/, {
    message: 'Invalid email address format',
  })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsArray()
  @IsEnum(AdminRoles, { each: true })
  roles: AdminRoles[];

  @IsOptional()
  @IsEnum(AccessLevels, { each: true })
  accessLevels: AccessLevels[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminPermissionLevelsDTO)
  admin_permissions?: AdminPermissionLevelsDTO[];
}
