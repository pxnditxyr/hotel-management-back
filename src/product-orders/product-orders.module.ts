import { Module } from '@nestjs/common'
import { ProductOrdersService } from './product-orders.service'
import { ProductOrdersController } from './product-orders.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth/auth.module'
import { ProductsModule } from 'src/products/products.module'
import { OrdersModule } from 'src/orders/orders.module'

@Module({
  controllers: [ ProductOrdersController ],
  providers: [
    ProductOrdersService,
    PrismaService
  ],
  imports: [
    AuthModule,
    ProductsModule,
    OrdersModule
  ],
  exports: [
    ProductOrdersService
  ]
})
export class ProductOrdersModule {}
