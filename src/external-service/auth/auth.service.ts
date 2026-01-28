import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor() {}

  async emailSignUp(email: string, password: string, role: string): Promise<any> {
    try {
      const apiUrl = `${process.env.AUTH_SERVICE_URI}/api/v1/user/auth/email-signup`;

      const response = await axios.post(apiUrl, {
        email,
        password,
        role,
      });
      console.log('Signup response: ', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during email signup:', error);
      throw error;
    }
  }
}
