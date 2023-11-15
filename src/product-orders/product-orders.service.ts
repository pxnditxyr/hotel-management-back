import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProductOrderDto, UpdateProductOrderDto } from './dto'
import { PrismaService } from 'src/prisma'
import { ProductsService } from 'src/products/products.service'
import { OrdersService } from 'src/orders/orders.service'
import { ProductOrder } from './entities/product-order.entity'

@Injectable()
export class ProductOrdersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService: PrismaService,
    
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService
  ) {}

  async create ( createProductOrderDto: CreateProductOrderDto ) : Promise<ProductOrder> {
    const { orderId, productId } = createProductOrderDto
    await this.productsService.findOne( productId )
    await this.ordersService.findOne( orderId )
    try {
      const productOrder = await this.prismaService.productOrders.create({
        data: { ...createProductOrderDto },
        include: { order: true, product: true }
      })
      return productOrder
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<ProductOrder[]> {
    const productOrders = await this.prismaService.productOrders.findMany({
      include: { order: true, product: true }
    })
    return productOrders
  }

  async findOne ( id : string ) : Promise<ProductOrder> {
    const productOrder = await this.prismaService.productOrders.findUnique({
      where: { id },
      include: { order: true, product: true }
    })
    if ( !productOrder ) throw new NotFoundException( `La orden de producto con id ${ id } no existe` )
    return productOrder
  }

  async update ( id : string, updateProductOrderDto : UpdateProductOrderDto ) : Promise<ProductOrder> {
    await this.findOne( id )
    const { orderId, productId } = updateProductOrderDto
    if ( orderId ) await this.ordersService.findOne( orderId )
    if ( productId ) await this.productsService.findOne( productId )
    try {
      const productOrder = await this.prismaService.productOrders.update({
        where: { id },
        data: { ...updateProductOrderDto },
        include: { order: true, product: true }
      })
      return productOrder
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string ) : Promise<ProductOrder> {
    const currentProductOrder = await this.findOne( id )
    try {
      const productOrder = await this.prismaService.productOrders.update({
        where: { id },
        data: { isActive: !currentProductOrder.isActive },
        include: { order: true, product: true }
      })
      return productOrder
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Ups! Algo salió mal, por favor revisa los logs' )
  }
}
