import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "src/entity/user.entity";
import { OrderDto } from "./dtos/order.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post("new")
  @UseGuards(AuthGuard)
  async PostOrder(@Body() order: OrderDto, @CurrentUser() user: User) {
    return await this.orderService.makeNewOrder(order, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async GetOrders(@CurrentUser() user: User) {
    return await this.orderService.getAllOrders(user);
  }
}
