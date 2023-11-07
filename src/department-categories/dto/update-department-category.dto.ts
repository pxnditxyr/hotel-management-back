import { PartialType } from '@nestjs/mapped-types'
import { CreateDepartmentCategoryDto } from './create-department-category.dto'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateDepartmentCategoryDto extends PartialType( CreateDepartmentCategoryDto ) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
