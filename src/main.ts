import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger( 'Main' )
  const app = await NestFactory.create<NestExpressApplication>( AppModule )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  app.setGlobalPrefix( 'api' )
  await app.listen( process.env.PORT || 3000 )
  logger.log( `Application is running on: ${ await app.getUrl() }` )
}
bootstrap()
