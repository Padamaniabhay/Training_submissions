import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "src/entity/user.entity";
import { OrderDto } from "./dtos/order.dto";
import { OrderService } from "./order.service";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiSecurity("JWT_AUTH")
  @Post("new")
  @UseGuards(AuthGuard)
  async PostOrder(@Body() order: OrderDto, @CurrentUser() user: User) {
    return await this.orderService.makeNewOrder(order, user);
  }

  @ApiSecurity("JWT_AUTH")
  @Get()
  @UseGuards(AuthGuard)
  async GetOrders(@CurrentUser() user: User) {
    return await this.orderService.getAllOrders(user);
  }
}
