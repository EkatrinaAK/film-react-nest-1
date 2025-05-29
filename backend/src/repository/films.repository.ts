
import { GetFilmDTO } from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<{ total: number; items: GetFilmDTO[] }>;
  findById(id: string): Promise<GetFilmDTO>;
  takingSeat(filmId: string, sessionId: string, place: string): Promise<void>;
}


  
