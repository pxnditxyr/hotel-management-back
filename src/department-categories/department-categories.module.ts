import { Module } from '@nestjs/common'
import { DepartmentCategoriesService } from './department-categories.service'
import { DepartmentCategoriesController } from './department-categories.controller'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'src/prisma'

@Module({
  controllers: [ DepartmentCategoriesController ],
  providers: [
    DepartmentCategoriesService,
    PrismaService
  ],
  imports: [ AuthModule ],
  exports: [ DepartmentCategoriesService ]
})
export class DepartmentCategoriesModule {}
