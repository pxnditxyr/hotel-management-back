import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies'
import { CustomersModule } from 'src/customers/customers.module'

@Module({
  controllers: [ AuthController ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  imports: [
    ConfigModule,
    forwardRef( () => UsersModule ),
    forwardRef( () => CustomersModule ),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async ( configService : ConfigService ) => ({
        secret: configService.get<string>( 'JWT_SECRET' ),
        signOptions: { expiresIn: configService.get<string>( 'JWT_EXPIRES_IN' ) }
      })
    }),
  ],
  exports: [ JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
