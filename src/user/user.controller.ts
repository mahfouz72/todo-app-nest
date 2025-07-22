import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';

@UseGuards(AuthenticationGuard)
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
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUserById(userId);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Body() user: CreateUserDTO,
  ) {
    return this.userService.updateUserById(userId, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.deleteUserById(userId);
  }
}
