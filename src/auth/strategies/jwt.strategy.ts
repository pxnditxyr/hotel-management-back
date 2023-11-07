import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IJwtPayload } from '../interfaces'
import { User } from 'src/users/entities/user.entity'
import { AuthService } from '../auth.service'
import { ConfigService } from '@nestjs/config'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor (
    private readonly authService : AuthService,

    configService : ConfigService
  ) {
    super({
      secretOrKey: configService.get<string>( 'JWT_SECRET' ),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate ( payload : IJwtPayload ) : Promise<User> {
    const { id } = payload
    const user = await this.authService.validateUser( id )
    if ( !user ) throw new UnauthorizedException( 'Credenciales inválidas' )
    if ( !user.isActive ) throw new UnauthorizedException( 'Esta cuenta ha sido eliminada, por favor contacte al administrador' )
    return user
  }
}
