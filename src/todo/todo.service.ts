import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { $Enums } from '../../generated/prisma';
import Status = $Enums.Status;
import Priority = $Enums.Priority;

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(todo: CreateTodoDTO, userId: number) {
    return await this.todoRepository.createTodo(todo, userId);
  }

  async getAllTodos(userId: number) {
    return this.todoRepository.getAllTodos(userId);
  }

  async getTodoById(todoId: number, userId: number) {
    return await this.todoRepository.getTodoById(todoId, userId);
  }

  async updateTodo(todoId: number, userId: number, todo: CreateTodoDTO) {
    return await this.todoRepository.updateTodo(todoId, userId, todo);
  }

  async deleteTodo(todoId: number, userId: number) {
    return await this.todoRepository.deleteTodo(todoId, userId);
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
    return this.todoRepository.getFilteredTodos(userId, filter);
  }

  async getTodoByTextSearch(userId: number, searchKey: string) {
    return this.todoRepository.getTodoByTextSearch(userId, searchKey);
  }

  async getSortedTodo(
    userId: number,
    sortBy: 'dueDate' | 'createdAt' | 'priority' | 'status',
    sortKey?: 'asc' | 'desc',
  ) {
    return this.todoRepository.getSortedTodo(userId, sortBy, sortKey);
  }
}
