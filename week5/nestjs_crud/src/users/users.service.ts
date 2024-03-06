import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUsers () {
    return await this.usersRepository.findAll();
  }

  async findUserById(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async createUser(userData: string) {
    return await this.usersRepository.create(userData);
  }

  async updateUser(id: string, userData: string) {
    return await this.usersRepository.update(id, userData);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findByUsername(username);
  }
}
