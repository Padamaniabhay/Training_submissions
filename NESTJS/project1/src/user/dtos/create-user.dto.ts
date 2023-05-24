import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
export class createUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(10)
  @MinLength(3)
  password: string;
}
