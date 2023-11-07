import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateDepartmentCategoryDto, UpdateDepartmentCategoryDto } from './dto'
import { PrismaService } from 'src/prisma'
import { DepartmentCategory } from './entities/department-category.entity'

@Injectable()
export class DepartmentCategoriesService {
  
  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create( createDepartmentCategoryDto : CreateDepartmentCategoryDto ) : Promise<DepartmentCategory> {
    try {
      const departmentCategory = await this.prismaService.departmentCategories.create({
        data: createDepartmentCategoryDto,
        include: { departments: true }
      })
      return departmentCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<DepartmentCategory[]> {
    const departmentCategories = await this.prismaService.departmentCategories.findMany({
      include: { departments: true }
    })
    return departmentCategories
  }

  async findOne ( id : string ) : Promise<DepartmentCategory> {
    const departmentCategory = await this.prismaService.departmentCategories.findUnique({
      where: { id },
      include: { departments: true }
    })
    if ( !departmentCategory ) throw new NotFoundException( `Department Category with ID ${ id } not found` )
    return departmentCategory
  }

  async update ( id : string, updateDepartmentCategoryDto : UpdateDepartmentCategoryDto ) : Promise<DepartmentCategory> {
    await this.findOne( id )
    try {
      const departmentCategory = await this.prismaService.departmentCategories.update({
        where: { id },
        data: updateDepartmentCategoryDto,
        include: { departments: true }
      })
      return departmentCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) : Promise<DepartmentCategory> {
    await this.findOne( id )
    try {
      const departmentCategory = await this.prismaService.departmentCategories.update({
        where: { id },
        data: { isActive: false },
        include: { departments: true }
      })
      return departmentCategory
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new Error( 'Error Inesperado, por favor lea los logs' )
  }
}
