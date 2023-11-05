import { IsNotEmpty, IsString } from 'class-validator'

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  userTerm: string

  @IsNotEmpty()
  password: string
}
