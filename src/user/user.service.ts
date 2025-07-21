import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async createUser(user: CreateUserDTO) {
    return await this.userRepository.createUser(user);
  }

  async getUserById(userId: number) {
    return await this.userRepository.getUserById(userId);
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.getUserByUsername(username);
  }

  async updateUserById(userId: number, user: CreateUserDTO) {
    return await this.userRepository.updateUser(userId, user);
  }

  async deleteUserById(userId: number) {
    return await this.userRepository.deleteUserById(userId);
  }
}
