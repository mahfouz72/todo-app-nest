import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  }

  async createUser(user: CreateUserDTO) {
    const { username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        todos: true,
      },
    });
  }

  async updateUser(id: number, user: CreateUserDTO) {
    const { username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        password: hashedPassword,
      },
    });
  }

  async deleteUserById(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
