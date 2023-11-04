import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentCategoryDto } from './create-department-category.dto';

export class UpdateDepartmentCategoryDto extends PartialType(CreateDepartmentCategoryDto) {}
