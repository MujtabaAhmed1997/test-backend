import {AdminResponseDTO} from "../dtos/admin-response.dto";
import {AdminRequestDTO} from "../dtos/admin-request.dto";
import {Injectable, OnModuleInit} from "@nestjs/common";
// import { AuthService } from "src/external-service/auth/auth.service";
import { AdminDAO } from "../daos/admin.dao";
import {AdminRoles} from "../enums/admin.enum"

@Injectable()

export class AdminService {
    constructor(
        // private readonly authService: AuthService,
        private readonly adminDAO: AdminDAO
    ) {}
    // async onModuleInit() {
    //     await this.createSuperAdmin();
    // }


    // async createSuperAdmin() {
    //     const authSuperAdmin = await this.authService.getSuperAdmin();

    //     const adminExist = await this.adminDAO.findByGlobalId(authSuperAdmin.globalId)

    //     if(!adminExist){
    //         await this.adminDAO.create({
    //             firstName: authSuperAdmin.firstName,
    //             lastName: authSuperAdmin.lastName,
    //             user_id: authSuperAdmin.globalId,
    //             email: authSuperAdmin.email,
    //             roles: [AdminRoles.ADMIN, AdminRoles.SUPER_ADMIN]
    //         })
    //     }
    //     else{
    //         console.log("Admin Exist: ", adminExist)
    //         console.log("SUPER ADMIN ALREADY EXIST")
    //     }
    // }
}