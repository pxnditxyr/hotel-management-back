import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ UsersController ],
  providers: [
    UsersService,
    PrismaService
  ],
  imports: [
    forwardRef( () => AuthModule ),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
