import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { CartItemDto } from "./cartItem.dto";

export class OrderDto {
  @Type(() => CartItemDto)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  cartItems: CartItemDto[];
}
