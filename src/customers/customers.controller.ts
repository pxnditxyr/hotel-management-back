import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CreateCustomerDto, UpdateCustomerDto } from './dto'
import { Customer } from './entities/customer.entity'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/entities/user.entity'

@Controller( 'customers' )
export class CustomersController {
  
  constructor (
    private readonly customersService : CustomersService
  ) {}

  @Post()
  @Auth()
  async create(
    @Body() createCustomerDto : CreateCustomerDto,
    @CurrentUser() creator : User
  ) : Promise<Customer> {
    return this.customersService.create( createCustomerDto, creator )
  }

  @Get()
  async findAll () : Promise<Customer[]> {
    return this.customersService.findAll()
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Customer> {
    return this.customersService.findOne( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateCustomerDto : UpdateCustomerDto
  ) : Promise<Customer> {
    return this.customersService.update( id, updateCustomerDto )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Customer> {
    return this.customersService.toggleStatus( id )
  }
}
