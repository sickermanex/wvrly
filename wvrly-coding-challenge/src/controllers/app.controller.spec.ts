import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { UserDataEntity } from 'src/db/entities/user_data.entity';
import { Repository } from 'typeorm';

class UserRepositoryMock extends Repository<UserDataEntity> {}

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getRepositoryToken: jest.fn().mockResolvedValue(UserRepositoryMock),
            getAll: jest.fn().mockResolvedValue(UserRepositoryMock),
            getData: jest.fn().mockResolvedValue(UserRepositoryMock),
            postUserData: jest.fn().mockResolvedValue(UserRepositoryMock),
          }
        }
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  describe('getAll', () => {
    it('should return an array of user data', async () => {
      const result: UserDataEntity[] = [{
        "id": 1,
        "lat": 11.3,
        "lon": 90.17,
        "geomPoint": {
            "type": "Point",
            "coordinates": [
                90.17,
                11.3
            ]
        },
        "name": "John",
        "lastname": "Doe",
        "phone": null,
        "email": null
    },
    {
      "id": 1,
      "lat": 11.3,
      "lon": 90.17,
      "geomPoint": {
          "type": "Point",
          "coordinates": [
              90.17,
              11.3
          ]
      },
      "name": "Jane",
      "lastname": "Doe",
      "phone": null,
      "email": null
    }
  ];
      jest.spyOn(appService, 'getAll').mockImplementation(() => Promise.resolve(result));

      expect(await appController.getAll()).toBe(result);
    });
  });

  describe('getData', () => {
    it('should return an array of user data based on query parameters', async () => {
      const result: UserDataEntity[] = [{
        "id": 1,
        "lat": 11.3,
        "lon": 90.17,
        "geomPoint": {
            "type": "Point",
            "coordinates": [
                90.17,
                11.3
            ]
        },
        "name": "John",
        "lastname": "Doe",
        "phone": null,
        "email": null
    }];
      const query = { lat: 'someLat', lon: 'someLon', radio: 'someRadio' };

      jest.spyOn(appService, 'getData').mockImplementation(() => Promise.resolve(result));

      expect(await appController.getData(query)).toBe(result);
    });
  });

  describe('postUserData', () => {
    it('should return a user data entity', async () => {
      const userData: Partial<UserDataEntity> = {
        "lat": 11.30,
        "lon": 90.17,
        "name": "John",
        "lastname": "Doe"
    };
      const result: UserDataEntity = {
        "id": 1,
        "lat": 11.3,
        "lon": 90.17,
        "geomPoint": {
            "type": "Point",
            "coordinates": [
                90.17,
                11.3
            ]
        },
        "name": "John",
        "lastname": "Doe",
        "phone": null,
        "email": null
    };

      jest.spyOn(appService, 'postUserData').mockImplementation(() => Promise.resolve(result));

      expect(await appController.postUserData(userData)).toBe(result);
    });
  });
});