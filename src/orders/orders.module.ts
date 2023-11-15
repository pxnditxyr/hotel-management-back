import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma';
import { AuthModule } from 'src/auth/auth.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  controllers: [ OrdersController ],
  providers: [
    OrdersService,
    PrismaService
  ],
  imports: [
    AuthModule,
    CustomersModule
  ],
  exports: [ OrdersService ]
})
export class OrdersModule {}
