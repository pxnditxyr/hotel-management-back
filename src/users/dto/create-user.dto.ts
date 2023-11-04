import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches }
from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string | null

  @IsEmail()
  email: string

  @IsString()
  @Matches( /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/, { message: 'El nombre de usuario debe tener entre 4 y 20 caracteres, empezar con una letra y solo puede contener letras, números y guiones bajos' } )
  username: string

  @IsString()
  @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número' } )
  password: string

  @IsString()
  @IsIn(['admin', 'user'])
  role: string
}
