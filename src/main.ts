import { NestFactory,Reflector } from '@nestjs/core';
import { ValidationPipe ,ClassSerializerInterceptor} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle('Challenger - NestJs - Jose Garate')
    .setDescription('EndPoints de una API Rest para manejo de Repositorios')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // URL API
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
