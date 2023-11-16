import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator'

export class CreateReservationDto {
  @IsUUID()
  customerId: string

  @IsUUID()
  departmentId: string

  @IsDateString()
  startDate: Date

  @IsDateString()
  endDate: Date

  @IsNumber()
  @Min( 0 )
  monetaryAdvance: number

  @IsString()
  @IsNotEmpty()
  paymentStatus: string
}
