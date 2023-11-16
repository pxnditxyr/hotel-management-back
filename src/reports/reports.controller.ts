import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { CreateReportDto, UpdateReportDto } from './dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'
import { Report } from './entities/report.entity'

@Controller( 'reports' )
export class ReportsController {
  constructor (
    private readonly reportsService : ReportsService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  async create ( @Body() createReportDto : CreateReportDto ) : Promise<Report> {
    return this.reportsService.create( createReportDto )
  }

  @Get()
  async findAll() : Promise<Report[]> {
    return this.reportsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Report> {
    return this.reportsService.findOne( id )
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateReportDto : UpdateReportDto
  ) : Promise<Report> {
    return this.reportsService.update( id, updateReportDto )
  }

  @Delete( ':id' )
  async toggleStatus( @Param( 'id' ) id : string ) : Promise<Report> {
    return this.reportsService.toggleStatus( id )
  }
}
