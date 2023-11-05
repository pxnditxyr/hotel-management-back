import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninDto, SignupDto } from './dto'

import { AuthResponse } from './types'
import { Auth, CurrentUser } from './decorators'
import { User } from 'src/users/entities/user.entity'

@Controller( 'auth' )
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post( 'signin' )
  async signin (
    @Body() signinDto : SigninDto
  ) : Promise<AuthResponse> {
    return this.authService.signin( signinDto )
  }

  @Post( 'signup' )
  async signup (
    @Body() signupDto : SignupDto
  ) : Promise<AuthResponse> {
    return this.authService.signup( signupDto )
  }

  @Get( 'revalidate-token' )
  @Auth()
  async revalidateToken (
    @CurrentUser() user : User,
  ) {
    return this.authService.revalidateToken( user )
  }
}
