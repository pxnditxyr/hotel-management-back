import { UserResponse } from './user-response.type'

export class AuthResponse {
  token: string
  user: UserResponse
}
