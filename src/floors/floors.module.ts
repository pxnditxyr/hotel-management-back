import { Module } from '@nestjs/common'
import { FloorsService } from './floors.service'
import { FloorsController } from './floors.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ FloorsController ],
  providers: [
    FloorsService,
    PrismaService
  ],
  imports: [ AuthModule ],
  exports: [ FloorsService ]
})
export class FloorsModule {}
