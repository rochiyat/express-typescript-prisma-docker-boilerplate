import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import env from './configs/env.config';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for CURD With Express and PostgreSQL',
      version: '1.0.0',
      description:
        "This is a API Documentation for CURD With Express and PostgreSQL based on the OpenAPI 3.0 specification.  You can find out more about Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the CRUD API, we've switched to the design first approach!",
      contact: {
        name: 'Rochiyat',
        url: 'https://github.com/rochiyat',
        email: 'rochiyat@gmail.com',
      },
      externalDocs: {
        description: 'Find out more about Swagger',
        url: 'https://swagger.io',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      termsOfService: 'https://swagger.io/terms/',
      tags: [
        {
          name: 'Users',
          description: 'User related endpoints',
        },
        {
          name: 'Projects',
          description: 'Project related endpoints',
        },
        {
          name: 'Roles',
          description: 'Role related endpoints',
        },
      ],
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ['./src/swagger/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
