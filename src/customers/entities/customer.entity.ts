import { Order } from 'src/orders/entities/order.entity'
import { Report } from 'src/reports/entities/report.entity'
import { Reservation } from 'src/reservations/entities/reservation.entity'
import { User } from 'src/users/entities/user.entity'

export class Customer {
  id: string

  dni: string

  name: string

  lastname: string

  phone: string

  userId: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  orders?: Order[]

  reservations?: Reservation[]

  reports?: Report[]

  user?: User | null
}
