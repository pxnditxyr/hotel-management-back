import { Injectable } from '@nestjs/common';
import { CreateDepartmentCategoryDto } from './dto/create-department-category.dto';
import { UpdateDepartmentCategoryDto } from './dto/update-department-category.dto';

@Injectable()
export class DepartmentCategoriesService {
  create(createDepartmentCategoryDto: CreateDepartmentCategoryDto) {
    return 'This action adds a new departmentCategory';
  }

  findAll() {
    return `This action returns all departmentCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departmentCategory`;
  }

  update(id: number, updateDepartmentCategoryDto: UpdateDepartmentCategoryDto) {
    return `This action updates a #${id} departmentCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} departmentCategory`;
  }
}
