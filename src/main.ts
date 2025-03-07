import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: true, //'http://localhost:5173',
    credentials: true,
  });

  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,             // удаляет неописанные в DTO свойства
  //   forbidNonWhitelisted: true,  // выбрасывает ошибку при наличии лишних свойств
  //   transform: true,             // преобразует входящие данные к типам, указанным в DTO
  // }));

  const config = new DocumentBuilder()
    .setTitle('API документация')
    .setDescription('Описание API')
    .setVersion('1.0')
    .addTag('auth-nest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();
