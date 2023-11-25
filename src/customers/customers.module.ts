import { Module, forwardRef } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersController } from './customers.controller'
import { PrismaService } from 'src/prisma'
import { UsersModule } from 'src/users/users.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ CustomersController ],
  providers: [
    CustomersService,
    PrismaService
  ],
  imports: [
    forwardRef( () => AuthModule ),
    forwardRef( () => UsersModule )
  ],
  exports: [ CustomersService ]
})
export class CustomersModule {}
