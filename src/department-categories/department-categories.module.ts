import { Module } from '@nestjs/common';
import { DepartmentCategoriesService } from './department-categories.service';
import { DepartmentCategoriesController } from './department-categories.controller';

@Module({
  controllers: [DepartmentCategoriesController],
  providers: [DepartmentCategoriesService],
})
export class DepartmentCategoriesModule {}
