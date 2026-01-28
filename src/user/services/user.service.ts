import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dtos/user.dto';
import { UserDAO } from '../daos/user.dao';
import { AuthService } from 'src/external-service/auth/auth.service';
import { SignupDTO } from '../dtos/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userDAO: UserDAO,
    private readonly authService: AuthService,
  ) {}

  async emailSignUp(userData: any): Promise<any> {
    try {
      const { email, password, role } = userData;
      return await this.authService.emailSignUp(email, password, role);
    } catch (error) {
      console.error('Error in UserService - emailSignUp: ', error);
      throw error;
    }
  }

  async signup(signupData: SignupDTO): Promise<any> {
    try {
      const { email, password } = signupData;

      // Check if user already exists
      const existingUser = await this.userDAO.findAllWithoutPagination(
        { email },
        ['*'],
      );

      if (existingUser.data.length > 0) {
        throw new Error('User with this email already exists');
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user in database
      const newUser = await this.userDAO.create({
        email,
        password: hashedPassword,
        is_profile_complete: false,
      } as any);


      return {
        success: true,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      console.error('Error in UserService - signup: ', error);
      throw error;
    }
  }

  // async findOrCreate(userData: UserDTO): Promise<UserDTO>{
  //     let authUser = await this.authService.findUser(userData.user_id)

  //     if(!authUser){
  //         authUser = await this.authService.createUser(userData)
  //     }

  //     const user = await this.userDAO.create(authUser);
  //     return user;
  // }
}
