import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCustomerDto, UpdateCustomerDto } from './dto'
import { PrismaService } from 'src/prisma'
import { Customer } from './entities/customer.entity'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'

const customerIncludes = {
  user: true,
  orders: true,
  reports: true,
  reservations: true
}

@Injectable()
export class CustomersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly usersService : UsersService
  ) {}

  async create ( createCustomerDto : CreateCustomerDto, creator? : User ) : Promise<Customer> {

    const { userId } = createCustomerDto
    if ( userId ) await this.usersService.findOne( userId )
    try {
      const customer = await this.prismaService.customers.create({
        data: {
          ...createCustomerDto,
          userId: userId ? userId : creator?.id || ''
        },
        include: { ...customerIncludes }
      })
      return customer
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Customer[]> {
    try {
      const customers = await this.prismaService.customers.findMany({
        include: { ...customerIncludes }
      })
      return customers
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findOne ( id : string ) : Promise<Customer> {
    const customer = await this.prismaService.customers.findUnique({
      where: { id },
      include: { ...customerIncludes }
    })
    if ( !customer ) throw new NotFoundException( `Customer with id ${ id } not found` )
    return customer
  }

  async update ( id : string, updateCustomerDto : UpdateCustomerDto ) : Promise<Customer> {
    await this.findOne( id )
    const { userId } = updateCustomerDto
    if ( userId ) await this.usersService.findOne( userId )
    try {
      const customer = await this.prismaService.customers.update({
        where: { id },
        data: { ...updateCustomerDto },
        include: { ...customerIncludes }
      })
      return customer
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) : Promise<Customer> {
    await this.findOne( id )
    try {
      const customer = await this.prismaService.customers.update({
        where: { id },
        data: { isActive: false },
        include: { ...customerIncludes }
      })
      return customer
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    if ( error.code === 'P2002' ) {
      throw new BadRequestException( `Customer with email ${ error.meta.target[ 0 ].email } already exists` )
    }
    throw new InternalServerErrorException( 'Internal server error' )
  }
}
