import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class createProductDto {
  @ApiProperty({
    description: "product name must have minimum 3 character",
    example: "product",
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 123,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
