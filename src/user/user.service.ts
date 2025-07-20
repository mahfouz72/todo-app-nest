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

  async getUserById(userId: number) {
    try {
      return await this.userRepository.getUserById(userId);
    } catch (err) {
      console.log(err);
    }
  }

  async getUserByUsername(username: string) {
    try {
      return await this.userRepository.getUserByUsername(username);
    } catch (err) {
      console.log(err);
    }
  }

  async updateUserById(userId: number, user: CreateUserDTO) {
    try {
      return await this.userRepository.updateUser(userId, user);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUserById(userId: number) {
    try {
      return await this.userRepository.deleteUserById(userId);
    } catch (err) {
      console.log(err);
    }
  }
}
