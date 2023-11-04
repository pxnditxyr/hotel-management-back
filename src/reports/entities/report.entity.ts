import { Customer } from "src/customers/entities/customer.entity"
import { Department } from "src/departments/entities/department.entity"
import { Reservation } from "src/reservations/entities/reservation.entity"

export class Report {
  id: string

  departmentId: string

  reservationId: string

  customerId: string

  name: string

  detail: string

  price: number

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  department?: Department | null

  reservation?: Reservation | null

  customer?: Customer | null
}
