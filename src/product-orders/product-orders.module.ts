import { Module } from '@nestjs/common';
import { ProductOrdersService } from './product-orders.service';
import { ProductOrdersController } from './product-orders.controller';

@Module({
  controllers: [ProductOrdersController],
  providers: [ProductOrdersService],
})
export class ProductOrdersModule {}
