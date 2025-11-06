import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({type: VersioningType.URI, defaultVersion: '1'});
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Parcial 2 - José Fernando Alfaro Ayzama')
    .setDescription('Segundo parcial de la asignatura Desarrollo de Aplicaciones Internet 2')
    .setVersion('1.0')
    .addTag('')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, documentFactory);

  await app.listen(process.env.PORT ?? 0);
  console.log(`Aplicacion corriendo en el puerto: ${await app.getUrl()}`);
}
bootstrap();
