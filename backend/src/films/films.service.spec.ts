
import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsMongoRepository } from '../repository/films.mongo.repository';
import { FilmsPostgresRepository } from '../repository/films.postgres.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
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

    service = module.get<FilmsService>(FilmsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
