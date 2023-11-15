import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto'
import { PrismaService } from 'src/prisma'
import { User } from './entities/user.entity'

import { hashSync } from 'bcrypt'

@Injectable()
export class UsersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create ( createUserDto : CreateUserDto ) : Promise<User> {
    try {
      const { password } = createUserDto
      const hashedPassword = hashSync( password, 10 )
      const user = await this.prismaService.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword
        },
        include: { customers: true }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<User[]> {
    const users = await this.prismaService.users.findMany({
      include: { customers: true }
    })
    return users
  }

  async findOne ( id : string ) : Promise<User> {
    const user = await this.prismaService.users.findUnique({
      where: { id },
      include: { customers: true }
    })
    if ( !user ) throw new NotFoundException( `El usuario con el id ${ id } no existe` )
    return user
  }

  async findOneByUserTerm ( userTerm : string ) : Promise<User> {
    const userWithEmail = await this.prismaService.users.findUnique({
      where: { email: userTerm },
      include: { customers: true }
    })
    if ( userWithEmail ) return userWithEmail

    const userWithUsername = await this.prismaService.users.findUnique({
      where: { username: userTerm },
      include: { customers: true }
    })
    if ( !userWithUsername ) throw new NotFoundException( `El usuario con el email o username ${ userTerm } no existe` )
    return userWithUsername
  }
      
  async update ( id : string, updateUserDto : UpdateUserDto ) : Promise<User> {
    await this.findOne( id )
    try {
      const { password } = updateUserDto
      if ( password ) {
        const hashedPassword = hashSync( password, 10 )
        updateUserDto.password = hashedPassword
      }
      const user = await this.prismaService.users.update({
        where: { id },
        data: { ...updateUserDto },
        include: { customers: true }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate  ( id : string ) : Promise<User> {
    await this.findOne( id )
    try {
      const user = await this.prismaService.users.update({
        where: { id },
        data: { isActive: false },
        include: { customers: true }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    if ( error.code === 'P2002' ) {
      const field = error.meta.target[ 0 ]
      throw new BadRequestException( `El campo ${ field } ya existe` )
    }
    console.error( error )
    throw new InternalServerErrorException( 'Ups! Algo salió mal, por favor revisa los logs' )
  }
}
