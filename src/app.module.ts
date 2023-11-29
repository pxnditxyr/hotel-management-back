import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { CustomersModule } from './customers/customers.module'
import { OrdersModule } from './orders/orders.module'
import { DepartmentsModule } from './departments/departments.module'
import { FloorsModule } from './floors/floors.module'
import { CategoriesModule } from './categories/categories.module'
import { ReportsModule } from './reports/reports.module'
import { ReservationsModule } from './reservations/reservations.module'
import { ProductsModule } from './products/products.module'
import { DepartmentCategoriesModule } from './department-categories/department-categories.module'
import { ProductOrdersModule } from './product-orders/product-orders.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    CustomersModule,
    OrdersModule,
    DepartmentsModule,
    FloorsModule,
    CategoriesModule,
    ReportsModule,
    ReservationsModule,
    ProductsModule,
    DepartmentCategoriesModule,
    ProductOrdersModule,
    // Rate Limit
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ContactModule,
  ],
})
export class AppModule {}
