import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { FloorsService } from './floors.service'
import { CreateFloorDto, UpdateFloorDto } from './dto'
import { Floor } from './entities/floor.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'

@Controller( 'floors' )
export class FloorsController {
  constructor (
    private readonly floorsService: FloorsService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  async create( @Body() createFloorDto : CreateFloorDto ) : Promise<Floor> {
    return this.floorsService.create( createFloorDto )
  }

  @Get()
  async findAll () : Promise<Floor[]> {
    return this.floorsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Floor> {
    return this.floorsService.findOne( id )
  }

  @Patch( ':id' )
  @Auth( ValidRoles.admin )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateFloorDto: UpdateFloorDto
  ) : Promise<Floor> {
    return this.floorsService.update( id, updateFloorDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.admin )
  async deactivate ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Floor> {
    return this.floorsService.deactivate( id )
  }
}
