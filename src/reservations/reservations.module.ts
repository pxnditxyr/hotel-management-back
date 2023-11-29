import { Module } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { ReservationsController } from './reservations.controller'
import { PrismaService } from 'src/prisma'
import { CustomersModule } from 'src/customers/customers.module'
import { AuthModule } from 'src/auth/auth.module'
import { DepartmentsModule } from 'src/departments/departments.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  controllers: [ ReservationsController ],
  providers: [
    ReservationsService,
    PrismaService
  ],
  imports: [
    AuthModule,
    CustomersModule,
    UsersModule,
    DepartmentsModule
  ],
  exports: [ ReservationsService ]
})
export class ReservationsModule {}
