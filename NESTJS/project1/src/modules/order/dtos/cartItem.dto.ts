import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CartItemDto {
  @ApiProperty({
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  PId: number;

  @ApiProperty({
    example: 12,
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
