import { Category } from "src/categories/entities/category.entity"
import { ProductOrder } from "src/product-orders/entities/product-order.entity"

export class Product {
  id: string

  name: string

  price: number

  stock: number

  imageUrl: string

  categoryId: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  category?: Category | null

  orders?: ProductOrder[]
}
