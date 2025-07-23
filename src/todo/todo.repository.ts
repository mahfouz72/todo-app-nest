import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { $Enums } from '../../generated/prisma';
import Status = $Enums.Status;
import Priority = $Enums.Priority;

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTodo(todo: CreateTodoDTO, userId: number) {
    return this.prisma.todo.create({
      data: {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
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
    const { title, description, status, priority, dueDate } = todo;
    return this.prisma.todo.update({
      where: {
        id: todoId,
        userid: userId,
      },
      data: {
        title: title,
        description: description,
        status: status,
        priority: priority,
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

  async getFilteredTodos(
    userId: number,
    filter: {
      status?: Status;
      priority?: Priority;
      dueAfter?: string;
      dueBefore?: string;
    },
  ) {
    return this.prisma.todo.findMany({
      where: {
        userid: userId,
        status: filter.status,
        priority: filter.priority,
        dueDate: {
          ...(filter.dueBefore ? { lte: new Date(filter.dueBefore) } : {}),
          ...(filter.dueAfter ? { gte: new Date(filter.dueAfter) } : {}),
        },
      },
    });
  }

  async getTodoByTextSearch(userId: number, searchKey: string) {
    return this.prisma.todo.findMany({
      where: {
        userid: userId,
        OR: [
          {
            title: {
              contains: searchKey,
            },
          },
          {
            description: {
              contains: searchKey,
            },
          },
        ],
      },
    });
  }

  async getSortedTodo(
    userId: number,
    sortBy: 'dueDate' | 'createdAt' | 'priority' | 'status',
    sortKey?: 'asc' | 'desc',
  ) {
    return this.prisma.todo.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        [sortBy]: sortKey ?? 'asc',
      },
    });
  }
}
