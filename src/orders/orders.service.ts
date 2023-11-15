import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { PrismaService } from 'src/prisma'
import { Order } from './entities/order.entity'
import { CustomersService } from 'src/customers/customers.service'

@Injectable()
export class OrdersService {
  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly customersService : CustomersService
  ) {}

  async create ( createOrderDto : CreateOrderDto ) : Promise<Order> {
    const { customerId } = createOrderDto
    await this.customersService.findOne( customerId )
    try {
      const order = await this.prismaService.orders.create({
        data: { ...createOrderDto },
        include: { customer: true, products: true }
      })
      return order
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Order[]> {
    const orders = await this.prismaService.orders.findMany({
      include: { customer: true, products: true }
    })
    return orders
  }

  async findOne ( id : string ) : Promise<Order> {
    const order = await this.prismaService.orders.findUnique({
      where: { id },
      include: { customer: true, products: true }
    })
    if ( !order ) throw new NotFoundException( `La orden con id ${ id } no existe` )
    return order
  }

  async update ( id : string, updateOrderDto : UpdateOrderDto ) : Promise<Order> {
    await this.findOne( id )
    try {

    const order = await this.prismaService.orders.update({
      where: { id },
      data: { ...updateOrderDto },
      include: { customer: true, products: true }
    })
    return order
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string ) {
    const currentOrder = await this.findOne( id )
    try {
      const order = await this.prismaService.orders.update({
        where: { id },
        data: { isActive: !currentOrder.isActive },
        include: { customer: true, products: true }
      })
      return order
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }
  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error inesperado, por favor revise los logs' )
  }
}
