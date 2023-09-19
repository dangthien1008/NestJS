import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { config } from 'process';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email: 'thien@gmail.com', password: '123' } as User,
        ]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'thien@gmail.com',
          password: '123',
        } as User);
      },
      // remove: (id: number) => {
      //   return Promise.resolve({
      //     id,
      //     email: 'thien@gmail.com',
      //     password: '123',
      //   } as User);
      // },
      // update: () => {},
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find All Users returns a list of users given email and password', async () => {
    const users = await controller.findAllUsers('thien@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('thien@gmail.com');
  });

  it('findUser return single user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    // try {
    //   await controller.findUser('1');
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('sigin updates session obj and returns user', async () => {
    const session = { userId: 0 };
    const body = { email: 'thien@gmail.com', password: 'password' };
    const user = await controller.signin(body, session);

    console.log(session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
