import { UseGuards,Controller, Get, Post, ValidationPipe, Param, Body, Put, Delete, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { userDto } from "./dto/user.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    const data = await this.usersService.findUsers();
    return { code: 200, message: 'get all users', data: data };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const data = await this.usersService.findUserById(id);
    return { code: 200, message: 'get user by id', data: data };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body(new ValidationPipe()) userData: userDto) {
    const user = await this.usersService.createUser(JSON.stringify(userData));
    return { code: 201, message: 'user created', data: user };
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body(new ValidationPipe()) userData: userDto) {
    const user = await this.usersService.updateUser(id, JSON.stringify(userData));
    if (!user) return new BadRequestException('user with given id does not exists');
    return { code: 200, message: 'user updated', data: user };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return { code: 200, message: 'user deleted' };
  }
} 