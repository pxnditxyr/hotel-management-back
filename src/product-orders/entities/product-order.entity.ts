import { Order } from "src/orders/entities/order.entity"
import { Product } from "src/products/entities/product.entity"

export class ProductOrder {
  id: string

  orderId: string

  productId: string

  quantity: number

  price: number

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  order?: Order | null

  product?: Product | null
}
