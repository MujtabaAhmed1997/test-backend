import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AdminController} from './controllers/admin.controller';
import {AdminService} from './services/admin.service';
import {Admin, AdminSchema} from './schemas/admin.schema';
// import { AuthService } from 'src/external-service/auth/auth.service';
import { AdminDAO } from './daos/admin.dao';

@Module({
    imports:[MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
    providers: [AdminService, AdminDAO],
    controllers: [AdminController],
})

export class AdminModule {}