import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  dni: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  lastname: string

  @IsNotEmpty()
  @IsString()
  phone: string

  @IsOptional()
  @IsUUID()
  userId?: string
}
