import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
// import { setUpApp } from '../src/setup-app';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setUpApp(app);
    await app.init();
  });

  // it('handle a singup request', async () => {
  //   const email = 'thien12@gmail.com';
  //   return request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .send({ email, password: 'password' })
  //     .expect(201)
  //     .then((res) => {
  //       const { id, email } = res.body;
  //       expect(id).toBeDefined();
  //       expect(email).toEqual(email);
  //     });
  // });

  // it('handle a signin request', async () => {
  //   const email = 'thien12@gmail.com';
  //   const body = { email, password: 'password' };
  //   const session = {};
  //   return request(app.getHttpServer())
  //     .post('/auth/signin')
  //     .send({ email, password: 'password' })
  //     .expect(201)
  //     .then((res) => {
  //       const { id, email } = res.body;
  //       expect(id).toBeDefined();
  //       expect(email).toEqual(email);
  //     });
  // });

  it('handle a singup and get currently user', async () => {
    const email = 'thien12@gmail.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'password', admin: true })
      .expect(201);

    const cookie = res.get('Set-Cookie');
    console.log(cookie);

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
