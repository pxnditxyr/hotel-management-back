import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { CreateReservationDto, UpdateReservationDto } from './dto'
import { Reservation } from './entities/reservation.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'

@Controller( 'reservations' )
export class ReservationsController {
  constructor (
    private readonly reservationsService: ReservationsService
  ) {}

  @Post()
  @Auth( ValidRoles.admin, ValidRoles.user )
  async create( @Body() createReservationDto : CreateReservationDto ) : Promise<Reservation> {
    return this.reservationsService.create( createReservationDto )
  }

  @Get()
  async findAll () : Promise<Reservation[]> {
    return this.reservationsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Reservation> {
    return this.reservationsService.findOne( id )
  }

  @Patch( ':id' )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateReservationDto: UpdateReservationDto
  ) : Promise<Reservation> {
    return this.reservationsService.update( id, updateReservationDto )
  }

  @Delete( ':id' )
  async toggleStatus ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Reservation> {
    return this.reservationsService.toggleStatus( id )
  }
}
