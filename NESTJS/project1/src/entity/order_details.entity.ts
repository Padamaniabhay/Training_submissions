import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Order_details {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  order_id: number;

  @Column({ default: 1 })
  quantity: number;
}

export const OrderDetails = Order_details.name;
