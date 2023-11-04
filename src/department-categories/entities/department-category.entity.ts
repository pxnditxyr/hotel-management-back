import { Department } from 'src/departments/entities/department.entity'

export class DepartmentCategory {
  id: string

  name: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  departments?: Department[]
}
