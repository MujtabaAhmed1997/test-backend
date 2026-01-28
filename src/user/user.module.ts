import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthService } from 'src/external-service/auth/auth.service';
import { UserDAO } from './daos/user.dao';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, AuthService, UserDAO],
  controllers: [UserController],
})
export class UserModule {}
