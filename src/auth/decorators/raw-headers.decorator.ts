import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const RawHeaders = createParamDecorator(
  ( data, ctx : ExecutionContext ) => {
    const request = ctx.switchToHttp().getRequest()
    const headers = request.rawHeaders
    return headers
  }
)
