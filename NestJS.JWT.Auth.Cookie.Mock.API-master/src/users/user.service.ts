import { UserResponseModel } from 'src/shared/models/user.response.model';
import { User } from './user';

export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        email: 'santoshmohan@gmail.com',
        firstName: 'santosh',
        lastName: 'mohan',
        id: 1,
        password: '12345',
        phone: '1234567890',
      },
    ];
  }

  async find(email: string): Promise<User> {
    return await this.users.find((_) => _.email == email);
  }

  async create(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<string> {
    let id = this.users.length + 1;
    this.users.push({
      email: email,
      firstName: firstName,
      lastName: lastName,
      id: id,
      password: password,
      phone: phone,
    });
    return 'User Added';
  }
}
