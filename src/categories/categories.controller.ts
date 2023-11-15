import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from './dto'
import { Category } from './entities/category.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'

@Controller( 'categories' )
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  async create ( @Body() createCategoryDto : CreateCategoryDto ) : Promise<Category> {
    return this.categoriesService.create( createCategoryDto )
  }

  @Get()
  async findAll () : Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Category> {
    return this.categoriesService.findOne( id )
  }

  @Patch( ':id' )
  @Auth( ValidRoles.admin )
  async update ( @Param( 'id', ParseUUIDPipe ) id : string, @Body() updateCategoryDto : UpdateCategoryDto ) : Promise<Category> {
    return this.categoriesService.update( id, updateCategoryDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.admin )
  async toggleStatus ( @Param( 'id', ParseUUIDPipe ) id : string ) {
    return this.categoriesService.toggleStatus( id )
  }
}
