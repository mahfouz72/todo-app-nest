import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  CreateUsers(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(+userId);
  }

  @Put(':id')
  updateUserById(@Param('id') userId: string, @Body() user: CreateUserDTO) {
    return this.userService.updateUserById(+userId, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id') userId: string) {
    return this.userService.deleteUserById(+userId);
  }
}
