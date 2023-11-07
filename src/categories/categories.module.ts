import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ CategoriesController ],
  providers: [
    CategoriesService,
    PrismaService
  ],
  imports: [ AuthModule ],
  exports: [ CategoriesService ]
})
export class CategoriesModule {}
