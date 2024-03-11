import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(
    username: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username)

    if(!user) throw new UnauthorizedException();

    if(user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username : user.username
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
