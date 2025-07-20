import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (err) {
      console.log(err);
    }
  }

  async createUser(user: CreateUserDTO) {
    try {
      return await this.userRepository.createUser(user);
    } catch (err) {
      console.log(err);
    }
  }
}
