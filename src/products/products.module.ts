import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth/auth.module'
import { CategoriesModule } from 'src/categories/categories.module'

@Module({
  controllers: [ ProductsController ],
  providers: [
    ProductsService,
    PrismaService
  ],
  imports: [
    AuthModule,
    CategoriesModule
  ],
  exports: [ ProductsService ]
})
export class ProductsModule {}
