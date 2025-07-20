import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { AuthenticationGuard } from './authentication.guard';

@Module({
  imports: [UserModule],
  providers: [AuthenticationService, AuthenticationGuard],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
