import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetFilmDTO } from '../films/dto/films.dto';
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
  async findAll(): Promise<{ total: number; items: GetFilmDTO[] }> {
    const items = await this.filmModel.find({});
    const total = items.length;
    return {
      total,
      items: items.map(this.getFilm()),
    };
  }

  async findById(id: string): Promise<GetFilmDTO> {
    try {
      const film = await this.filmModel.findOne({ id: id });
      return this.getFilm()(film);
    } catch {
      throw new NotFoundException(`Фильм с id ${id} отсутствует в БД`);
    }
  }

  async takingSeat(
    filmId: string,
    sessionIndex: string,
    place: string,
  ): Promise<void> {
    try {
      await this.filmModel.updateOne(
        { id: filmId },
        { $push: { [`schedule.${sessionIndex}.taken`]: place } },
      );
    } catch (error) {
      new ConflictException('При бронировании места произошли ошибки');
    }
  }
}
