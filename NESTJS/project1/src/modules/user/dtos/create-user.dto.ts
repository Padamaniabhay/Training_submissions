import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
export class createUserDto {
  @ApiProperty({
    description: "user email id",
    example: "xyz@gmail.com",
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "length must be greater than 3",
    example: "xyz@123",
  })
  @IsString()
  @MinLength(3)
  password: string;
}
