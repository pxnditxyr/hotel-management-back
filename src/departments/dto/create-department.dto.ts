import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator'

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @Min( 1 )
  @IsNumber()
  number: number

  @IsNotEmpty()
  @IsString()
  detail: string

  @Min( 1 )
  @IsNumber()
  price: number

  @IsUUID()
  floorId: string

  @IsUUID()
  departmentCategoryId: string

  @IsNotEmpty()
  @IsString()
  imageUrl: string
}
