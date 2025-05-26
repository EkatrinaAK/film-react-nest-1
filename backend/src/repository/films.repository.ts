import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetFilmDTO, GetScheduleDTO } from '../films/dto/films.dto';
import { Film } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  private getFilm(): (Film) => GetFilmDTO {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  private getScheluderFilm(): (Schedule) => GetScheduleDTO {
    return (root) => {
      return {
        id: root.id,
        daytime: root.daytime,
        hall: root.hall,
        rows: root.rows,
        seats: root.seats,
        price: root.price,
        taken: root.taken,
      };
    };
  }

  async findAllFilms(): Promise<{ total: number; items: GetFilmDTO[] }> {
    const items = await this.filmModel.find({}); //используем обычные методы Mongoose-документов
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: items.map(this.getFilm()),
    };
  }

  async findScheduleById(
    filmId: string,
  ): Promise<{ total: number; items: GetScheduleDTO[] }> {
    const film = await this.filmModel.findOne({ id: filmId }); //используем обычные методы Mongoose-документов
    const schedule = film.schedule;
    return {
      total: schedule.length,
      items: schedule.map(this.getScheluderFilm()),
    };
  }
}
