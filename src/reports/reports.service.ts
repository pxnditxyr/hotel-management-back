import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateReportDto, UpdateReportDto } from './dto'
import { PrismaService } from 'src/prisma'
import { DepartmentsService } from 'src/departments/departments.service'
import { ReservationsService } from 'src/reservations/reservations.service'
import { CustomersService } from 'src/customers/customers.service'
import { Report } from './entities/report.entity'

@Injectable()
export class ReportsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly departmentsService : DepartmentsService,
    private readonly reservationsService : ReservationsService,
    private readonly customersService : CustomersService
  ) {}

  async create( createReportDto : CreateReportDto ) : Promise<Report> {
    const { customerId, departmentId, reservationId  } = createReportDto
    await this.customersService.findOne( customerId )
    await this.departmentsService.findOne( departmentId )
    await this.reservationsService.findOne( reservationId )

    try {
      const report = await this.prismaService.reports.create({
        data: createReportDto,
        include: {
          customer: true,
          department: true,
          reservation: true
        }
      })
      return report
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Report[]> {
    const reports = await this.prismaService.reports.findMany({
      include: {
        customer: true,
        department: true,
        reservation: true
      }
    } )
    return reports
  }

  async findOne ( id : string ) : Promise<Report> {
    const report = await this.prismaService.reports.findUnique({
      where: { id },
      include: {
        customer: true,
        department: true,
        reservation: true
      }
    })
    if ( !report ) throw new NotFoundException( `No se encontró el reporte con id: ${ id }` )
    return report
  }

  async update ( id : string, updateReportDto: UpdateReportDto ) : Promise<Report> {
    await this.findOne( id )
    const { customerId, departmentId, reservationId } = updateReportDto
    if ( customerId ) await this.customersService.findOne( customerId )
    if ( departmentId ) await this.departmentsService.findOne( departmentId )
    if ( reservationId ) await this.reservationsService.findOne( reservationId )
    try {
      const report = await this.prismaService.reports.update({
        where: { id },
        data: updateReportDto,
        include: {
          customer: true,
          department: true,
          reservation: true
        }
      })
      return report
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string ) : Promise<Report> {
    const currentReport = await this.findOne( id )
    try {
      const report = await this.prismaService.reports.update({
        where: { id },
        data: {
          isActive: !currentReport.isActive
        },
        include: {
          customer: true,
          department: true,
          reservation: true
        }
      })
      return report
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Ups! Algo salió mal, por favor revise los logs' )
  }

}
