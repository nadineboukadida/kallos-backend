import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OrderItem } from './entities/order-item.entity';
import { UsersModule } from 'src/users/users.module';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product]),
    AuthModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
