import { DepartmentCategory } from 'src/department-categories/entities/department-category.entity'
import { Floor } from 'src/floors/entities/floor.entity'
import { Report } from 'src/reports/entities/report.entity'
import { Reservation } from 'src/reservations/entities/reservation.entity'

export class Department {
  id: string

  name: string

  number: number

  detail: string

  floorId: string

  departmentCategoryId: string

  imageUrl: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  reservations?: Reservation[]

  reports?: Report[]

  floor?: Floor | null

  departmentCategory?: DepartmentCategory | null
}
