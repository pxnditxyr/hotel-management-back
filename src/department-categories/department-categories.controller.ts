import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { DepartmentCategoriesService } from './department-categories.service'
import { CreateDepartmentCategoryDto, UpdateDepartmentCategoryDto } from './dto'
import { Auth } from 'src/auth/decorators'
import { DepartmentCategory } from './entities/department-category.entity'

@Controller( 'department-categories' )
export class DepartmentCategoriesController {
  constructor (
    private readonly departmentCategoriesService : DepartmentCategoriesService
  ) {}

  @Post()
  @Auth()
  async create(
    @Body() createDepartmentCategoryDto : CreateDepartmentCategoryDto
  ) : Promise<DepartmentCategory> {
    return this.departmentCategoriesService.create( createDepartmentCategoryDto )
  }

  @Get()
  async findAll() : Promise<DepartmentCategory[]> {
    return this.departmentCategoriesService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<DepartmentCategory> {
    return this.departmentCategoriesService.findOne( id )
  }

  @Patch( ':id' )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateDepartmentCategoryDto : UpdateDepartmentCategoryDto
  ) : Promise<DepartmentCategory> {
    return this.departmentCategoriesService.update( id, updateDepartmentCategoryDto )
  }

  @Delete( ':id' )
  async toggleStatus ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<DepartmentCategory> {
    return this.departmentCategoriesService.toggleStatus( id )
  }
}
