import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({
    origin: ["http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://0.0.0.0:5173",
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });
  const options = new DocumentBuilder()
        .setTitle('Memory Book API')
        .setDescription('API for hackaton')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
