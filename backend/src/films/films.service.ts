import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

   async getAll() {
    return this.filmsRepository.findAll();
  }

  async getScheduleFilm(id: string) {
    const film = await this.filmsRepository.findById(id);
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}