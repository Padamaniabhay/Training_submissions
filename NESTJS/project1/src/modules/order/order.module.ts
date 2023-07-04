import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order_details } from "../../entity/order_details.entity";
import { ProductModule } from "src/modules/product/product.module";
import { AuthModule } from "src/modules/auth/auth.module";
import { Order } from "src/entity/order.entity";

@Module({
  imports: [
    AuthModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, Order_details]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
