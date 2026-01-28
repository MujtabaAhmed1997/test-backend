import { UserDTO } from "../dtos/user.dto";
import { Body, Controller, Get, Post, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { SignupDTO } from "../dtos/signup.dto";


@Controller('/api/v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('/auth/email-signup')
    async emailSignUp(@Body() userData: any){
        return await this.userService.emailSignUp(userData);
    }

    @Post('/signup')
    async signup(@Body() signupData: SignupDTO) {
        try {
            return await this.userService.signup(signupData);
        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    message: error.message || 'Signup failed',
                },
                error.message?.includes('already exists') 
                    ? HttpStatus.CONFLICT 
                    : HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post('/find-create')
    async findOrCreate(@Body() userData: UserDTO){
        // return await this.userService.findOrCreate(userData);
    }


    @Get('/self')
    async getUserData(){
        
    }

}