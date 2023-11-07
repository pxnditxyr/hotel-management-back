import { Module } from '@nestjs/common'
import { DepartmentsService } from './departments.service'
import { DepartmentsController } from './departments.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth/auth.module'
import { FloorsModule } from 'src/floors/floors.module'
import { DepartmentCategoriesModule } from 'src/department-categories/department-categories.module'

@Module({
  controllers: [ DepartmentsController ],
  providers: [
    DepartmentsService,
    PrismaService
  ],
  imports: [ AuthModule, FloorsModule, DepartmentCategoriesModule ],
  exports: [ DepartmentsService ]
})
export class DepartmentsModule {}
