import { BaseDTO } from 'src/common/base.dto';

import {
  IsEmail,
  Matches,
  IsOptional,
  Length,
  IsEnum,
  IsString,
  IsBoolean,
  IsDateString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import {
  Gender,
  Role,
} from '../enums/user.enum';
import { Type } from 'class-transformer';

export class ChatBotTokensDTO {
  text_tokens: number;
  tts_tokens: number;
  image_tokens: number;
  stt_tokens: number;
  audio_call_mins: number;
}

export class UserDTO extends BaseDTO {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  @Length(2, 25)
  full_name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  @Matches(/^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/, {
    message: 'Invalid email address format',
  })
  email: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender = Gender.OTHER;

  @IsOptional()
  @IsDateString()
  date_of_birth?: Date;

  @IsNumber()
  @IsOptional()
  user_age?: number;

  @IsString()
  @IsOptional()
  user_mood?: string;

  @IsString()
  @IsOptional()
  private_key?: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role = Role.USER;

  @IsBoolean()
  @IsOptional()
  general_notification?: boolean;

  @IsString()
  @IsOptional()
  profile_img_url?: string;

  @IsOptional()
  @IsBoolean()
  is_profile_complete?: boolean;

  @Type(() => ChatBotTokensDTO)
  @ValidateNested()
  @IsOptional()
  chat_bot_tokens?: ChatBotTokensDTO;

  @IsBoolean()
  @IsOptional()
  is_account_deleted?: boolean;
}
