import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDepartmentCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string
}
