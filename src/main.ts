import { NestFactory } from '@nestjs/core';

// import { setUpApp } from './setup-app';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as any).set('etag', false);

  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  // setUpApp(app);

  // app.use(
  //   cookieSession({
  //     keys: ['cookie'],
  //   }),
  // );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
