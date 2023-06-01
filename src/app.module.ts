import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile.controller';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformationInterceptor } from './response.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "kallos",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    OrdersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, ProfileController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformationInterceptor,
    },
  ],
})
export class AppModule { }
