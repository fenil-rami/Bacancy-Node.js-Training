import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  signIn(@Body() userData: userDto) {
    return this.authService.signIn(userData.username, userData.password);
  }
}
