import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

export class CreateFloorDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsInt()
  @Min( 0 )
  number: number

  @IsNotEmpty()
  @IsString()
  detail: string

  @IsNotEmpty()
  @IsString()
  imageUrl: string
}
