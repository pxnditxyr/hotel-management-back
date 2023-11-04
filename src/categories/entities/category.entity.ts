import { Product } from 'src/products/entities/product.entity'

export class Category {
  id: string

  name: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  products?: Product[]
}
