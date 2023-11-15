import { IsNumber, IsUUID, Min } from 'class-validator'

export class CreateProductOrderDto {
  @IsUUID()
  orderId: string

  @IsUUID()
  productId: string

  @IsNumber()
  @Min( 1 )
  quantity: number

  @IsNumber()
  @Min( 0 )
  price: number
}
