import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "src/entity/user.entity";
import { createProductDto } from "./dtos/create-product.dto";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: createProductDto, @CurrentUser() user: User) {
    return this.productService.createProduct(product, user);
  }
}
