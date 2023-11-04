import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentCategoriesService } from './department-categories.service';
import { CreateDepartmentCategoryDto } from './dto/create-department-category.dto';
import { UpdateDepartmentCategoryDto } from './dto/update-department-category.dto';

@Controller('department-categories')
export class DepartmentCategoriesController {
  constructor(private readonly departmentCategoriesService: DepartmentCategoriesService) {}

  @Post()
  create(@Body() createDepartmentCategoryDto: CreateDepartmentCategoryDto) {
    return this.departmentCategoriesService.create(createDepartmentCategoryDto);
  }

  @Get()
  findAll() {
    return this.departmentCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentCategoryDto: UpdateDepartmentCategoryDto) {
    return this.departmentCategoriesService.update(+id, updateDepartmentCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentCategoriesService.remove(+id);
  }
}
