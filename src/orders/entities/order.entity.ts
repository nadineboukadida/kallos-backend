import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column({
    type: 'timestamp',
  })
  orderDate: Date;

  @Column()
  shippingAddress: string;

  @Column({
    default: '',
  })
  note: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, { cascade: true })
  user: User;
}
