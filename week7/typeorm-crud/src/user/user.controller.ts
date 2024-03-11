import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  } 

  @Put(':id') 
  update(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.userService.update(parseInt(id), userData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}