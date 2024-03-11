import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from '.';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig)],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
