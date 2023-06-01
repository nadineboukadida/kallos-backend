import { OrderStatus } from '../entities/order-status.enum';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  status: OrderStatus;
  orderItems: CreateOrderItemDto[];
  shippingAddress: string;
  note: string;
}
