import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator'

export class CreateReportDto {
  @IsUUID()
  departmentId: string

  @IsUUID()
  reservationId: string

  @IsUUID()
  customerId: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  detail: string

  @IsNumber()
  @Min( 0 )
  price: number
}
