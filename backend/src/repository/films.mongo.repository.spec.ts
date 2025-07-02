import { Test, TestingModule } from '@nestjs/testing';
import { FilmsMongoRepository } from './films.mongo.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Film } from '../films/schemas/film.schema';
import { Model } from 'mongoose';

describe('FilmsMongoRepository', () => {
  let provider: FilmsMongoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsMongoRepository,
        {
          provide: getModelToken(Film.name),
          useValue: Model,
        },
      ],
    }).compile();

    provider = module.get<FilmsMongoRepository>(FilmsMongoRepository);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});