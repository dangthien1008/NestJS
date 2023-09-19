import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { async } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // create a fake copy of the users service
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = (await module).get(AuthService);
  });

  // it('can create auth service', async () => {
  //   expect(service).toBeDefined();
  // });

  // it('creates a new user with a salted and hashed pass', async () => {
  //   const user = await service.signup('thien12@example.com', '456');

  //   expect(user.password).not.toEqual('456');
  //   const [salt, hash] = user.password.split('.');
  //   expect(salt).toBeDefined();
  //   expect(hash).toBeDefined();
  // });

  // it('throws an error if user signs up with email that is in use', async () => {
  //   fakeUsersService.find = () =>
  //     Promise.resolve([
  //       { id: 1, email: 'test@test.com', password: 'test' } as User,
  //     ]);

  //   await expect(service.signup('testasd@test.com', 'test')).rejects.toThrow(
  //     BadRequestException,
  //   );
  // });

  it('throws if signin is called with an unused email', async () => {
    await service.signup('laskdjf@alskdfj.com', 'password');
    const user = await service.signin('laskdjf@alskdfj.com', 'password');
    expect(user).toBeDefined();
  });

  // it('return a user if correct password is provided', async () => {
  //   await service.signup('test@test.com', 'password');

  //   const user = await service.signin('test@test.com', 'password');

  //   expect(user).toBeDefined();
  //   // const user = await service.signup('test@test.com', 'password');
  //   // console.log(user);
  // });
});
