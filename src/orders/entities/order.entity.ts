import { Customer } from "src/customers/entities/customer.entity"
import { ProductOrder } from "src/product-orders/entities/product-order.entity"

export class Order {
  id: string

  customerId: string

  method: string

  totalProducts: number

  totalAmount: number
  
  placedAt: Date

  paymentStatus: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  customer?: Customer | null
  
  products?: ProductOrder[]
}
