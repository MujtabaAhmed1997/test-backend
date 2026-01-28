import { IsEnum, IsOptional } from 'class-validator';
import { AccessLevels, PermissionLevels } from '../enums/admin.enum';

export class AdminPermissionLevelsDTO {
  @IsOptional()
  @IsEnum(AccessLevels)
  admin_access_level?: AccessLevels;

  @IsOptional()
  @IsEnum(PermissionLevels)
  permission_level?: PermissionLevels;
}
