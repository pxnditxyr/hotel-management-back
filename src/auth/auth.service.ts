import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { SigninDto, SignupDto } from './dto'
import { AuthResponse } from './types'
import { compareSync } from 'bcrypt'
import { User } from 'src/users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { CustomersService } from 'src/customers/customers.service'


@Injectable()
export class AuthService {
  constructor (
    private readonly usersService : UsersService,
    private readonly customersService : CustomersService,

    private readonly jwtService : JwtService
  ) {}

  async signin ( signinDto : SigninDto ) : Promise<AuthResponse> {
    const { userTerm, password } = signinDto
    const user = await this.usersService.findOneByUserTerm( userTerm )
    if ( !user.isActive ) throw new UnauthorizedException( 'Esta cuenta ha sido eliminada, por favor contacte al administrador' )
    
    const { password: hashedPassword } = user
    if ( !compareSync( password, hashedPassword ) ) throw new UnauthorizedException( 'Credenciales inválidas' )
    return  {
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        username: user.username
      },
      token: this.generateToken( user.id )
    }
  }
    
  async signup ( signupDto : SignupDto ) : Promise<AuthResponse> {
    const { dni, lastname, phone, name } = signupDto
    try {
      const userWithEmail = await this.usersService.findOneByUserTerm( signupDto.email )
      if ( userWithEmail ) throw new UnauthorizedException( 'Ya existe un usuario con este correo electrónico' )
    } catch ( error ) {
      if ( error.message === 'Ya existe un usuario con este correo electrónico' ) throw new BadRequestException( error.message )
    }
    try {
      const userWithUsername = await this.usersService.findOneByUserTerm( signupDto.username )
      if ( userWithUsername ) throw new Error( 'Ya existe un usuario con este nombre de usuario' )
    } catch ( error ) {
      if ( error.message === 'Ya existe un usuario con este nombre de usuario' ) throw new BadRequestException( error.message )
    }

    try {
      const customerWithDni = await this.customersService.findOneByDni( dni )
      if ( customerWithDni ) throw new Error( 'Ya existe un cliente con este dni' )
    } catch ( error ) {
      if ( error.message === 'Ya existe un cliente con este dni' ) throw new BadRequestException( error.message )
    }

    const user = await this.usersService.create({
      ...signupDto,
      role: 'user'
    })

    await this.customersService.create({ dni, lastname, phone, name, userId: user.id })

    return {
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        username: user.username
      },
      token: this.generateToken( user.id )
    }
  }

  async revalidateToken ( user : User ) : Promise<AuthResponse> {
    const { id } = user
    return {
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        username: user.username
      },
      token: this.generateToken( id )
    }
  }

  private generateToken ( id : string ) : string {
    return this.jwtService.sign({ id })
  }

  async validateUser ( id : string) : Promise<User> {
    const user = await this.usersService.findOne( id )
    if ( !user ) throw new UnauthorizedException( 'El usuario ha sido eliminado' )
    return user
  }
}
