import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

describe('ItemsController', () => {
  let controller: ItemsController;
  let mockRepository: any;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [ItemsController],
    //   providers: [ItemsService],
    // }).compile();
    
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item), // Get the token for your entity's repository
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
