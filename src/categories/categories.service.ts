import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from 'src/prisma'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create ( createCategoryDto : CreateCategoryDto ) : Promise<Category> {
    try {
      const category = await this.prismaService.categories.create({
        data: { ...createCategoryDto },
        include: { products: true }
      })
      return category
    } catch ( error ) {
      this.handlerDBError( error )
    }
  }

  async findAll () : Promise<Category[]> {
    const categories = await this.prismaService.categories.findMany({
      include: { products: true }
    })
    return categories
  }

  async findOne ( id : string ) : Promise<Category> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
      include: { products: true }
    })
    if ( !category ) throw new NotFoundException( `Category with id ${ id } not found` )
    return category
  }

  async update ( id : string, updateCategoryDto : UpdateCategoryDto ) : Promise<Category> {
    this.findOne( id )
    try {
      const category = await this.prismaService.categories.update({
        where: { id },
        data: { ...updateCategoryDto },
        include: { products: true }
      })
      return category
    } catch ( error ) {
      this.handlerDBError( error )
    }
  }

  async deactivate ( id : string ) : Promise<Category> {
    this.findOne( id )
    try {
      const category = await this.prismaService.categories.update({
        where: { id },
        data: { isActive: false },
        include: { products: true }
      })
      return category
    } catch ( error ) {
      this.handlerDBError( error )
    }
  }

  private handlerDBError ( error : any ) : never {
    console.error( error )
    throw new Error( 'Internal Server Error' )
  }
}
