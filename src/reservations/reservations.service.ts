import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateReservationDto, UpdateReservationDto } from './dto'
import { PrismaService } from 'src/prisma'
import { CustomersService } from 'src/customers/customers.service'
import { DepartmentsService } from 'src/departments/departments.service'
import { Reservation } from './entities/reservation.entity'
import { UsersService } from 'src/users/users.service'
import { Customer } from 'src/customers/entities/customer.entity'

@Injectable()
export class ReservationsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly usersService : UsersService,
    private readonly customersService : CustomersService,
    private readonly departmentsService : DepartmentsService
  ) {}

  async create( createReservationDto : CreateReservationDto ) : Promise<Reservation> {
    const { customerId, departmentId } = createReservationDto
    let customer : Customer | undefined | null
    try {
      await this.usersService.findOne( customerId )
      customer = await this.customersService.findOneByUserId( customerId )
    } catch ( error ) {
      customer = await this.customersService.findOne( customerId )
    }
    await this.departmentsService.findOne( departmentId )
    try {
      const reservation = await this.prismaService.reservations.create({
        data: {
          ...createReservationDto,
          startDate: new Date( createReservationDto.startDate ),
          endDate: new Date( createReservationDto.endDate ),
          customerId: customer.id
        },
        include: {
          reports: true,
          customer: true,
          department: true
        }
      })
      return reservation
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Reservation[]> {
    const reservations = await this.prismaService.reservations.findMany({
      include: {
        reports: true,
        customer: true,
        department: true
      }
    } )
    return reservations
  }

  async findOne ( id : string ) : Promise<Reservation> {
    const reservation = await this.prismaService.reservations.findUnique({
      where: { id },
      include: {
        reports: true,
        customer: true,
        department: true
      }
    })
    if ( !reservation ) throw new NotFoundException( `No se encontró la reservación con id: ${ id }` )
    return reservation
  }

  async update ( id : string, updateReservationDto : UpdateReservationDto ) : Promise<Reservation> {
    await this.findOne( id )
    const { customerId, departmentId } = updateReservationDto
    if ( customerId ) await this.customersService.findOne( customerId )
    if ( departmentId ) await this.departmentsService.findOne( departmentId )
    const { startDate, endDate } = updateReservationDto
    if ( startDate ) updateReservationDto.startDate = new Date( startDate )
    if ( endDate ) updateReservationDto.endDate = new Date( endDate )
    try {
      const reservation = await this.prismaService.reservations.update({
        where: { id },
        data: { ...updateReservationDto },
        include: {
          reports: true,
          customer: true,
          department: true
        }
      })
      return reservation
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string ) : Promise<Reservation> {
    const currentReservation = await this.findOne( id )
    try {
      const reservation = await this.prismaService.reservations.update({
        where: { id },
        data: { isActive: !currentReservation.isActive },
        include: {
          reports: true,
          customer: true,
          department: true
        }
      })
      return reservation
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }
  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Ups! Algo salió mal, por favor revise los logs' )
  }
}
