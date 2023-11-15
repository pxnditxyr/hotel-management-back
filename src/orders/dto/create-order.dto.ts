import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator'

export class CreateOrderDto {
  @IsUUID()
  customerId: string

  @IsString()
  @IsNotEmpty()
  method: string

  @IsNumber()
  @Min( 1 )
  totalProducts: number

  @IsNumber()
  @Min( 0 )
  totalAmount: number
  
  @IsString()
  @IsNotEmpty()
  paymentStatus: string
}
