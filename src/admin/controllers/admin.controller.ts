import { Controller, UseGuards, Post, Body } from "@nestjs/common";
import { AdminService } from "../services/admin.service";
import { AdminRequestDTO } from "../dtos/admin-request.dto";
import { AdminResponseDTO } from "../dtos/admin-response.dto";

@Controller('api/v1/admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ){}

    // @Post('/create-admin')
    // async registerAdmin(@Body() data: AdminRequestDTO): Promise<AdminResponseDTO> {
    //     return await this.adminService.createAdmin(data);
    // }
}