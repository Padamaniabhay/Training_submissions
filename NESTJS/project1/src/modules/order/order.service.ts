import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from "src/modules/product/product.service";
import { User } from "src/entity/user.entity";
import { DataSource, Repository } from "typeorm";
import { CartItemDto } from "./dtos/cartItem.dto";
import { OrderDto } from "./dtos/order.dto";
import { Order_details } from "../../entity/order_details.entity";
import { Order } from "src/entity/order.entity";

@Injectable()
export class OrderService {
  constructor(
    private datasource: DataSource,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Order_details)
    private orderDetailsRepo: Repository<Order_details>,
    private ProductService: ProductService,
  ) {}

  async makeNewOrder(order: OrderDto, user: User) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //create order
      const newOrder = queryRunner.manager.create(Order);
      newOrder.user = user;
      const placedOrder = await queryRunner.manager.save(Order, newOrder);

      const products = await this.ProductService.findByIds(
        order.cartItems.map((cartItem: CartItemDto) => cartItem.PId),
      );

      if (order.cartItems.length !== products.length) {
        throw new BadRequestException("product not found");
      }

      //create order_details records
      const orderDetails = order.cartItems.map((cartItem: CartItemDto) =>
        this.orderDetailsRepo.create({
          order_id: placedOrder.id,
          product_id: cartItem.PId,
          quantity: cartItem.quantity,
        }),
      );
      await queryRunner.manager.save(Order_details, orderDetails);

      await queryRunner.commitTransaction();
      return { userID: newOrder.user.id, orderID: newOrder.id, orderDetails };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllOrders(user: User) {
    const queryBuilder = this.orderRepo.createQueryBuilder("order");

    const orders = await queryBuilder
      .where("order.user = :id", { id: user.id })
      .leftJoinAndSelect("order.products", "products")
      .getMany();
    console.log(orders);

    return orders;
  }
}
