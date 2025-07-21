import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTodo(todo: CreateTodoDTO, userId: number) {
    return this.prisma.todo.create({
      data: {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        dueDate: new Date(todo.dueDate),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getAllTodos(userId: number) {
    return this.prisma.todo.findMany({
      where: {
        userid: userId,
      },
    });
  }

  async getTodoById(todoId: number, userId: number) {
    return this.prisma.todo.findUnique({
      where: {
        id: todoId,
        userid: userId,
      },
    });
  }

  async updateTodo(todoId: number, userId: number, todo: CreateTodoDTO) {
    const { title, description, status, dueDate } = todo;
    return this.prisma.todo.update({
      where: {
        id: todoId,
        userid: userId,
      },
      data: {
        title: title,
        description: description,
        status: status,
        dueDate: new Date(dueDate),
      },
    });
  }

  async deleteTodo(todoId: number, userId: number) {
    return this.prisma.todo.delete({
      where: {
        id: todoId,
        userid: userId,
      },
    });
  }
}
