import { Customer } from 'src/customers/entities/customer.entity'

export class User {
  id: string

  name?: string | null

  email: string

  username: string

  password: string

  role: string

  isActive: boolean

  createdAt: Date

  updatedAt: Date

  customers?: Customer[]
}
