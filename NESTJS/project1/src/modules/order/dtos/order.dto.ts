import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { CartItemDto } from "./cartItem.dto";

export class OrderDto {
  @ApiProperty({
    type: () => [CartItemDto],
  })
  @Type(() => CartItemDto)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  cartItems: CartItemDto[];
}
