import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Request,
  UseGuards,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@UsePipes(ValidationPipe)
@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(@Request() req) {
    return this.todoService.getAllTodos(+req.user.id);
  }

  @Post()
  createTodo(@Request() req, @Body() todo: CreateTodoDTO) {
    const userId = +req.user.id;
    return this.todoService.createTodo(todo, userId);
  }

  @Get(':id')
  getTodoById(@Request() req, @Param('id', ParseIntPipe) todoId: number) {
    return this.todoService.getTodoById(todoId, +req.user.id);
  }

  @Put(':id')
  updateTodo(
    @Request() req,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() todo: CreateTodoDTO,
  ) {
    return this.todoService.updateTodo(todoId, +req.user.id, todo);
  }

  @Delete(':id')
  deleteTodo(@Request() req, @Param('id', ParseIntPipe) todoId: number) {
    return this.todoService.deleteTodo(todoId, +req.user.id);
  }
}
