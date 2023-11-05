import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @Matches( /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/, { message: 'El nombre de usuario debe tener entre 4 y 20 caracteres, empezar con una letra y solo puede contener letras, números y guiones bajos' } )
  username: string

  @IsString()
  @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número' } )
  password: string
}
