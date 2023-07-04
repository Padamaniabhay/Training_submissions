import { User } from "src/entity/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { OrderDetails } from "./order_details.entity";

@Entity()
export class Product {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "float", unsigned: true, default: 0 })
  price: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToMany(() => Order)
  @JoinTable({
    name: OrderDetails,
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "order_id",
      referencedColumnName: "id",
    },
  })
  orders?: Order[];
}
