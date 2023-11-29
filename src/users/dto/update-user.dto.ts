import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto extends PartialType( CreateUserDto ) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageUrl?: string
}
