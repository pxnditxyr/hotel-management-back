import { Customer } from "src/customers/entities/customer.entity"
import { Department } from "src/departments/entities/department.entity"
import { Report } from "src/reports/entities/report.entity"

export class Reservation {
  id: string

  customerId: string

  departmentId: string

  startDate: Date

  endDate: Date

  monetaryAdvance: number

  paymentStatus: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  customer?: Customer | null

  department?: Department | null

  reports?: Report[]
}
