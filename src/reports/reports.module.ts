import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaService } from 'src/prisma';
import { AuthModule } from 'src/auth/auth.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  controllers: [ ReportsController ],
  providers: [
    ReportsService,
    PrismaService
  ],
  imports: [
    AuthModule,
    DepartmentsModule,
    ReservationsModule,
    CustomersModule
  ],
  exports: [ ReportsService ]
})
export class ReportsModule {}
