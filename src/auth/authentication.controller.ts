import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  login(@Body() user: CreateUserDTO) {
    const { username, password } = user;
    return this.authenticationService.login(username, password);
  }

  @Post('/register')
  register(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }
}
