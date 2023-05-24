import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
