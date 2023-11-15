import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto, UpdateProductDto } from './dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'
import { Product } from './entities/product.entity'

@Controller( 'products' )
export class ProductsController {
  constructor (
    private readonly productsService : ProductsService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  async create ( @Body() createProductDto : CreateProductDto ) : Promise<Product> {
    return this.productsService.create( createProductDto )
  }

  @Get()
  async findAll () : Promise<Product[]> {
    return this.productsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Product> {
    return this.productsService.findOne( id )
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  async update (
    @Param( 'id' ) id : string,
    @Body() updateProductDto : UpdateProductDto
  ) : Promise<Product> {
    return this.productsService.update( id, updateProductDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.admin )
  async toggleStatus( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Product> {
    return this.productsService.toggleStatus( id )
  }
}
