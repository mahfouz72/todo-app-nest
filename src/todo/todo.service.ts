import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoDTO } from './dto/create-todo.dto';

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
}
