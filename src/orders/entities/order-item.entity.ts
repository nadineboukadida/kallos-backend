import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
  @ManyToOne(() => Product, (product) => product.orderItems, { cascade: true })
  product: Product;
}
