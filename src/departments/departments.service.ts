import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto'
import { PrismaService } from 'src/prisma'
import { Department } from './entities/department.entity'
import { DepartmentCategoriesService } from 'src/department-categories/department-categories.service'
import { FloorsService } from 'src/floors/floors.service'

const departmentIncludes = {
  floor: true,
  reports: true,
  reservations: true,
  departmentCategory: true
}

@Injectable()
export class DepartmentsService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly departmentCategoriesService : DepartmentCategoriesService,
    private readonly floorsService : FloorsService
  ) {}

  async create ( createDepartmentDto : CreateDepartmentDto ) : Promise<Department> {
    const { floorId, departmentCategoryId } = createDepartmentDto
    await this.departmentCategoriesService.findOne( departmentCategoryId )
    await this.floorsService.findOne( floorId )
    try {
      const department = await this.prismaService.departments.create({
        data: { ...createDepartmentDto },
        include: { ...departmentIncludes }
      })
      return department
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll() : Promise<Department[]> {
    const departments = await this.prismaService.departments.findMany({
      include: { ...departmentIncludes }
    })
    return departments
  }

  async findOne ( id : string ) : Promise<Department> {
    const department = await this.prismaService.departments.findUnique({
      where: { id },
      include: { ...departmentIncludes }
    })
    if ( !department ) throw new NotFoundException( `No se encontró el departamento con id ${ id }` )
    return department
  }

  async update ( id : string, updateDepartmentDto : UpdateDepartmentDto ) : Promise<Department> {
    await this.findOne( id )
    try {
      const department = await this.prismaService.departments.update({
        where: { id },
        data: { ...updateDepartmentDto },
        include: { ...departmentIncludes }
      })
      return department
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) : Promise<Department> {
    await this.findOne( id )
    try {
      const department = await this.prismaService.departments.update({
        where: { id },
        data: { isActive: false },
        include: { ...departmentIncludes }
      })
      return department
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    if ( error.code === 'P2002' ) {
      throw new BadRequestException( `Ya existe un departamento con el numero ${ error.meta.target[ 1 ] }` )
    }
    throw new InternalServerErrorException( 'Error al procesar la solicitud, por favor revise los logs' )
  }

}
