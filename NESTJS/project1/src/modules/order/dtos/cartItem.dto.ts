import { IsInt, IsNotEmpty } from "class-validator";

export class CartItemDto {
  @IsNotEmpty()
  @IsInt()
  PId: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
