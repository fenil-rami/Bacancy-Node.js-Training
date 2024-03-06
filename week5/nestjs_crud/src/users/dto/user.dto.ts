import { IsNotEmpty, IsString } from 'class-validator';

export class userDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
