import { Test, TestingModule } from '@nestjs/testing';
import { FilmsPostgresRepository } from '../repository/films.postgres.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../films/entities/schedule.entity';

describe('FilmsPostgresRepository', () => {
  let provider: FilmsPostgresRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsPostgresRepository,
        {
          provide: getRepositoryToken(Film),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Schedule),
          useClass: Repository,
        },
      ],
    }).compile();

    provider = module.get<FilmsPostgresRepository>(FilmsPostgresRepository);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});