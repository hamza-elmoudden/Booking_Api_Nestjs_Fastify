import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true, 
      bodyLimit: 1048576, 
    })
  );

  dotenv.config();

  const config = new DocumentBuilder()
    .setTitle('Booking example')
    .setDescription('The Booking API description')
    .setVersion('1.0')
    .addTag('Booking')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000,'0.0.0.0');
}
bootstrap();
