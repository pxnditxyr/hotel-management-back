import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateContactDto } from './dto'
import { PrismaService } from 'src/prisma'
import { Contact } from './entities/contact.entity'

@Injectable()
export class ContactService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create( createContactDto : CreateContactDto ) : Promise<Contact> {
    try {
      const contact = await this.prismaService.contactUs.create({
        data: { ...createContactDto }
      })
      return contact
    } catch ( error ) {
      throw new InternalServerErrorException( 'Ups! Algo salió mal, revisa los logs' )
    }
  }

  async findAll () : Promise<Contact[]> {
    const contacts = await this.prismaService.contactUs.findMany()
    return contacts
  }

  async findOne ( id : string ) : Promise<Contact> {
    const contact = await this.prismaService.contactUs.findUnique({
      where: { id }
    })
    if ( !contact ) throw new NotFoundException( 'Contacto no encontrado' )
    return contact
  }
}
