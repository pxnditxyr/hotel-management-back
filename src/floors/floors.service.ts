import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateFloorDto, UpdateFloorDto } from './dto'
import { PrismaService } from 'src/prisma'
import { Floor } from './entities/floor.entity'

@Injectable()
export class FloorsService {
  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create( createFloorDto : CreateFloorDto ) : Promise<Floor> {
    try {
      const floor = await this.prismaService.floors.create( {
        data: { ...createFloorDto },
        include: { departments: true }
      } )
      return floor
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Floor[]> {
    const floors = await this.prismaService.floors.findMany({
      include: { departments: true }
    })
    return floors
  }

  async findOne ( id : string ) : Promise<Floor> {
    const floor = await this.prismaService.floors.findUnique({
      where: { id },
      include: { departments: true }
    })
    if ( !floor ) throw new NotFoundException( `No se encontró el piso con id ${ id }` )
    return floor
  }

  async update ( id : string, updateFloorDto : UpdateFloorDto ) : Promise<Floor> {
    await this.findOne( id )
    try {
      const floor = await this.prismaService.floors.update({
        where: { id },
        data: { ...updateFloorDto },
        include: { departments: true }
      })
      return floor
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) : Promise<Floor> {
    await this.findOne( id )
    try {
      const floor = await this.prismaService.floors.update({
        where: { id },
        data: { isActive: false },
        include: { departments: true }
      })
      return floor
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error inesperado, por favor revise los logs' )
  }
}
