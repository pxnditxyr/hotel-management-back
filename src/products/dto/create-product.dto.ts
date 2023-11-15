import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @Min( 0 )
  price: number

  @IsNumber()
  @Min( 0 )
  stock: number

  @IsString()
  @IsNotEmpty()
  imageUrl: string

  @IsUUID()
  categoryId: string
}
