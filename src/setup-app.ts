import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

export const setUpApp = (app: INestApplication<any>) => {
  app.use(
    cookieSession({
      keys: ['cookie'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};
