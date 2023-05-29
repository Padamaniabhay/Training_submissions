import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class createProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}
