import { Department } from 'src/departments/entities/department.entity'

export class Floor {
  id: string

  name: string

  number: number

  detail: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  departments?: Department[]
}
