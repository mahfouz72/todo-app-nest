import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(todo: CreateTodoDTO, userId: number) {
    try {
      return await this.todoRepository.createTodo(todo, userId);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllTodos(userId: number) {
    try {
      return await this.todoRepository.getAllTodos(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async getTodoById(todoId: number, userId: number) {
    try {
      return await this.todoRepository.getTodoById(todoId, userId);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(todoId: number, userId: number, todo: CreateTodoDTO) {
    try {
      return await this.todoRepository.updateTodo(todoId, userId, todo);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(todoId: number, userId: number) {
    try {
      return await this.todoRepository.deleteTodo(todoId, userId);
    } catch (error) {
      console.log(error);
    }
  }
}
