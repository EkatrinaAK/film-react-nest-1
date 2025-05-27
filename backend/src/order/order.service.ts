import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { GetOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderData: GetOrderDTO) {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      const film = await this.filmsRepository.findById(ticket.film);
      const scheduleIndex = film.schedule.findIndex(
        (s) => s.id === ticket.session,
      );
      if (scheduleIndex === -1) {
        throw new NotFoundException(`Нет расписания с id '${ticket.session}'`);
      }
      const place = `${ticket.row}:${ticket.seat}`;
      if (film.schedule[scheduleIndex].taken.includes(place)) {
        throw new BadRequestException(`Место уже занято`);
      }
      await this.filmsRepository.takingSeat(
        ticket.film,
        scheduleIndex.toString(),
        place,
      );
    }
    return { total: tickets.length, items: tickets };
  }
}
