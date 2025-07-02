import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsMongoRepository } from '../repository/films.mongo.repository';
import { FilmsPostgresRepository } from '../repository/films.postgres.repository';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: 'FILMS_REPOSITORY', useClass: FilmsMongoRepository },
        { provide: 'FILMS_REPOSITORY', useClass: FilmsPostgresRepository },
      ],
    })
      .overrideProvider('FILMS_REPOSITORY')
      .useValue({
        findAll: jest.fn(),
        findById: jest.fn(),
        takingSeat: jest.fn(),
      })
      .compile();

    service = module.get<OrderService>(OrderService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});