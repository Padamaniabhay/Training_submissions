import { Product } from "src/entity/product.entity";
import { User } from "src/entity/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetails } from "./order_details.entity";

@Entity()
export class Order {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user?: User;

  @ManyToMany(() => Product, {
    cascade: true,
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinTable({
    name: OrderDetails,
    joinColumn: {
      name: "order_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
  })
  products?: Product[];
}
