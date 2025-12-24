import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import { Response } from 'express';

export default class SwaggerConfig {
  private app: INestApplication;
  private document: OpenAPIObject;
  // singleton pattern
  private static instance: SwaggerConfig;

  constructor(app: INestApplication) {
    this.app = app;
    this.document = this.createDocument();
  }

  public static getInstance(app: INestApplication): SwaggerConfig {
    if (!SwaggerConfig.instance) {
      SwaggerConfig.instance = new SwaggerConfig(app);
    }
    return SwaggerConfig.instance;
  }

  private createDocument(): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle('Ticket4U - User Auth Service')
      .setDescription('User Authentication Service for Ticket4U Application')
      .setVersion('1.0.0')
      .addTag('Ticket4U')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'JWT-auth',
      )
      .build();

    return SwaggerModule.createDocument(this.app, config);
  }

  public setup(): void {
    // Swagger UI
    SwaggerModule.setup(`/${process.env.SERVICE_NAME || 'nestjs-user-auth'}/swagger/ui`, this.app, this.document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    // Swagger JSON (cho API Gateway)
    this.app
      .getHttpAdapter()
      .get(`/${process.env.SERVICE_NAME || 'nestjs-user-auth'}/swagger/json`, (req, res: Response) => {
        res.json(this.document);
      });
  }
}
