import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    const invalidCredentialsException = new UnauthorizedException(
      'Invalid username or password',
    );

    if (!user) {
      throw invalidCredentialsException;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (matchedPassword) {
      const payload = { id: user.id, username: user.username };
      return await this.jwtService.signAsync(payload);
    } else {
      throw invalidCredentialsException;
    }
  }
}
