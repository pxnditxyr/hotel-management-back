import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
   ( _data, ctx : ExecutionContext ) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    if ( !user ) throw new InternalServerErrorException( 'No se ha encontrado el usuario' )
    return user
  }
)
