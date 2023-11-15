import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { DepartmentsService } from './departments.service'
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto'
import { Department } from './entities/department.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'

@Controller( 'departments' )
export class DepartmentsController {
  constructor (
    private readonly departmentsService: DepartmentsService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  async create( @Body() createDepartmentDto : CreateDepartmentDto ) : Promise<Department> {
    return this.departmentsService.create( createDepartmentDto )
  }

  @Get()
  async findAll () : Promise<Department[]> {
    return this.departmentsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Department> {
    return this.departmentsService.findOne( id )
  }

  @Patch( ':id' )
  @Auth( ValidRoles.admin )
  async update (
    @Param( 'id' ) id : string,
    @Body() updateDepartmentDto : UpdateDepartmentDto
  ) : Promise<Department> {
    return this.departmentsService.update( id, updateDepartmentDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.admin )
  async toggleStatus ( @Param( 'id' ) id : string ) : Promise<Department> {
    return this.departmentsService.toggleStatus( id )
  }
}
