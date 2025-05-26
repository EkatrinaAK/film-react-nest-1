import { Injectable,NotFoundException } from '@nestjs/common';
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
    const items = await this.filmModel.find({}); 
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: items.map(this.getFilm()),
    };
  }

  async findAllSchedulesById(
    filmId: string,
  ): Promise<{ total: number; items: GetScheduleDTO[] }> {
    const film = await this.findFilmById(filmId); 
    const schedule = film.schedule;
    return {
      total: schedule.length,
      items: schedule.map(this.getScheluderFilm()),
    };
  }

  async findFilmById(filmId: string): Promise<GetFilmDTO> {
    try {
      const film = await this.filmModel.findOne({ id: filmId });
      const mapper = this.getFilm();
      return mapper(film);
    } catch {
      throw new NotFoundException(`Фильм с ${filmId} не найден`);
    }
  }

  async findSchedulesById(
    filmId: string,
    scheduleId: string,
  ): Promise<GetScheduleDTO> {
    const { items } = await this.findAllSchedulesById(filmId);
    const schedule = items.find((el) => el.id === scheduleId);
    if (!schedule) {
      throw new NotFoundException(`Сеанса с ${scheduleId} не найден`);
    }
    return schedule;
  }

  async checkPlace(
    filmId: string,
    scheduleId: string,
    place: string,
  ): Promise<boolean> {
    const res = await this.filmModel.find({
      id: filmId,
      schedule: {
        $elemMatch: {
          id: scheduleId,
          taken: place,
        },
      },
    });
    return Boolean(res.length);
  }

  async updatePlaces(
    filmId: string,
    scheduleId: string,
    place: string,
  ): Promise<void> {
    await this.filmModel.updateOne(
      {
        id: filmId,
        schedule: {
          $elemMatch: {
            id: scheduleId,
          },
        },
      },
      {
        $push: { 'schedule.$.taken': place },
      },
    );
  }
}
