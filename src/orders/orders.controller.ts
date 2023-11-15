import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/enums'
import { Order } from './entities/order.entity'

@Controller( 'orders' )
export class OrdersController {

  constructor (
    private readonly ordersService: OrdersService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  async create( @Body() createOrderDto : CreateOrderDto ) : Promise<Order> {
    return this.ordersService.create( createOrderDto )
  }

  @Get()
  async findAll () : Promise<Order[]> {
    return this.ordersService.findAll()
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Order> {
    return this.ordersService.findOne( id )
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  async update(
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateOrderDto : UpdateOrderDto
  ) : Promise<Order> {
    return this.ordersService.update( id, updateOrderDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.admin, ValidRoles.user )
  async toggleStatus ( @Param( 'id', ParseUUIDPipe ) id: string ) {
    return this.ordersService.toggleStatus( id )
  }
}
