import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ProductOrdersService } from './product-orders.service'
import { CreateProductOrderDto, UpdateProductOrderDto } from './dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'
import { ProductOrder } from './entities/product-order.entity'

@Controller( 'product-orders' )
export class ProductOrdersController {

  constructor (
    private readonly productOrdersService: ProductOrdersService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  async create( @Body() createProductOrderDto : CreateProductOrderDto ) : Promise<ProductOrder> {
    return this.productOrdersService.create( createProductOrderDto )
  }

  @Get()
  async findAll () : Promise<ProductOrder[]> {
    return this.productOrdersService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<ProductOrder> {
    return this.productOrdersService.findOne( id )
  }

  @Patch( ':id' )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateProductOrderDto : UpdateProductOrderDto
  ) : Promise<ProductOrder> {
    return this.productOrdersService.update( id, updateProductOrderDto )
  }

  @Delete( ':id' )
  async toggleStatus ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<ProductOrder> {
    return this.productOrdersService.toggleStatus( id )
  }
}
