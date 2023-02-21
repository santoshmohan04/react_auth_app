import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseModel } from 'src/shared/models/user.response.model';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseModel> {
    const user = await this.userService.find(email);
    if (user == null) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    return {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      phone: user.phone,
    };
  }

  async createUser(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    confirmpassword: string,
  ): Promise<String> {
    if (firstName == '' && firstName == null && typeof firstName !== 'string') {
      return 'Enter Valid First Name';
    }

    if (lastName == '' && lastName == null && typeof lastName !== 'string') {
      return 'Enter Valid Last Name';
    }

    if (phone == '' && phone == null && typeof phone !== 'string') {
      return 'Enter Valid Phone Number';
    }

    if (email == '' && email == null && typeof email !== 'string') {
      return 'Enter Valid Email';
    }

    if (password == '' && password == null && typeof password !== 'string') {
      return 'Enter Valid Password';
    }

    if (password !== confirmpassword) {
      return 'Entered Passwords do not match';
    }

    const user = await this.userService.find(email);
    if (user == null) {
      const create_response = await this.userService.create(
        firstName,
        lastName,
        phone,
        email,
        password,
      );
      let reply_data = '';
      if (create_response == 'User Added') {
        reply_data = 'User Created Successfully, Kindly Login';
      } else {
        reply_data = 'Something went wrong';
      }
      return reply_data;
    } else {
      return 'User is available with the given email';
    }
  }

  async getToken(user: UserResponseModel) {
    return this.jwtService.sign(user);
  }
}
