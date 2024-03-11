import { IsAlpha, IsNumber } from 'class-validator'

export class CreateUserDto {
  @IsAlpha()
  username: string

  @IsAlpha()
  password: string

  @IsNumber()
  age: number
}