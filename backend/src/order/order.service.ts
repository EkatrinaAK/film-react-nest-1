import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { GetOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@Inject('FILMS_REPOSITORY') private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderData: GetOrderDTO) {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      const film = await this.filmsRepository.findById(ticket.film);
      const scheduleDto = film.schedule.find((s) => s.id === ticket.session);

      if (!scheduleDto) {
        throw new NotFoundException(`Нет расписания с id '${ticket.session}'`);
      }
      const place = `${ticket.row}:${ticket.seat}`;
      if (scheduleDto.taken.includes(place)) {
        throw new BadRequestException(`Место уже занято`);
      }
       await this.filmsRepository.takingSeat(ticket.film, scheduleDto.id, place);
    }
    return { total: tickets.length, items: tickets };
  }
}
