import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  signIn(@Body() userData: UpdateUserDto) {
    return this.authService.signIn(userData.username, userData.password);
  }
}
