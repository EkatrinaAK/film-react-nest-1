import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { GetFilmDTO } from '../films/dto/films.dto';
import { Film } from '../films/schemas/film.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  private getFilm(): (Film) => GetFilmDTO {
    return (root) => {
      return {
        id: root._id,
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
      const film = await this.filmModel.findOne({ _id: id });
      return this.getFilm()(film);
    } catch {
      throw new NotFoundException(`Фильм с id ${id} отсутствует в БД`);
    }
  }

  async takingSeat(
    filmId: string,
    sessionId: string,
    place: string,
  ): Promise<void> {
    try {
      await this.filmModel.updateOne(
        { _id: filmId },
        { $push: { [`schedule.$[elem].taken`]: place } },
        {
          arrayFilters: [
            {
              'elem.id': sessionId,
            },
          ],
        },
      );
    } catch (error) {
      throw new ConflictException(
        'При бронировании места произошли ошибки',
      );
    }
  }
}