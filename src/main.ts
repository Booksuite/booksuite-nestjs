import '@/common/utils/dayjs'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['verbose'],
    })

    const config = new DocumentBuilder()
        .setTitle('BookSuite API')
        .setVersion('1.0')
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, documentFactory)

    app.useGlobalPipes(new ValidationPipe())

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })

    await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
