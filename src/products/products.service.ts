import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProductDto, UpdateProductDto } from './dto'
import { PrismaService } from 'src/prisma'
import { CategoriesService } from 'src/categories/categories.service'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly categoriesService : CategoriesService
  ) {}

  async create ( createProductDto : CreateProductDto ) : Promise<Product> {
    const { categoryId } = createProductDto
    await this.categoriesService.findOne( categoryId )
    try {
      const product = await this.prismaService.products.create({
        data: { ...createProductDto },
        include: { orders: true, category: true }
      })
      return product
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Product[]> {
    const products = await this.prismaService.products.findMany({
      include: { orders: true, category: true }
    })
    return products
  }

  async findOne ( id : string ) : Promise<Product> {
    const product = await this.prismaService.products.findUnique({
      where: { id },
      include: { orders: true, category: true }
    })
    if ( !product ) throw new NotFoundException( `El producto con el id ${ id } no existe` )
    return product
  }

  async update ( id : string, updateProductDto : UpdateProductDto ) : Promise<Product> {
    await this.findOne( id )
    const { categoryId } = updateProductDto
    if ( categoryId ) await this.categoriesService.findOne( categoryId )
    console.log( updateProductDto )
    try {
      const product = await this.prismaService.products.update({
        where: { id },
        data: { ...updateProductDto },
        include: { orders: true, category: true }
      })
      return product
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string ) : Promise<Product> {
    const product = await this.findOne( id )
    try {
      const updatedProduct = await this.prismaService.products.update({
        where: { id },
        data: { isActive: !product.isActive },
        include: { orders: true, category: true }
      })
      return updatedProduct
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Ups! Algo salió mal, por favor revisa los logs' )
  }
}
