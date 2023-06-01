import { IsString, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  quantity: number;
  @IsNumber()
  productId: number;
}
