import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto'
import { Contact } from './entities/contact.entity'

@Controller( 'contact' )
export class ContactController {
  constructor( private readonly contactService: ContactService ) {}

  @Post()
  async create( @Body() createContactDto : CreateContactDto ) : Promise<Contact> {
    return this.contactService.create( createContactDto )
  }

  @Get()
  async findAll () : Promise<Contact[]> {
    return this.contactService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id' ) id : string ) : Promise<Contact> {
    return this.contactService.findOne( id )
  }
}
