import { IsEmail, IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator'

export class SignupDto {
  // Class validator
  @IsNotEmpty()
  @IsString( { message: 'El nombre debe ser un string' } )
  name: string

  @IsEmail( {}, { message: 'El email debe ser un email válido' } )
  email: string

  @IsNotEmpty()
  @Matches( /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/, { message: 'El nombre de usuario debe tener entre 4 y 20 caracteres, empezar con una letra y solo puede contener letras, números y guiones bajos' } )
  username: string

  @IsString()
  @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número' } )
  password: string

  @IsNotEmpty()
  @IsNumberString( { no_symbols: true }, { message: 'El dni debe ser un número' } )
  dni: string

  @IsNotEmpty()
  @IsString( { message: 'El apellido debe ser un string' } )
  lastname: string

  @IsNotEmpty()
  @IsNumberString( { no_symbols: true }, { message: 'El teléfono debe ser un número' } )
  phone: string
}
