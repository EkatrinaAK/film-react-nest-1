import { Injectable, BadRequestException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { GetOrderDTO, GetTicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(private readonly filmsRepository: FilmsRepository) {}

    async createOrder(
    orderData: GetOrderDTO,
  ): Promise<{ items: GetTicketDTO[]; total: number }> {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      await this.filmsRepository.findSchedulesById(ticket.film, ticket.session);
      const place = `${ticket.row}:${ticket.seat}`;
      if (
        await this.filmsRepository.checkPlace(
          ticket.film,
          ticket.session,
          place,
        )
      ) {
        throw new BadRequestException(`Место ${place} уже забронировано`);
      }
      this.filmsRepository.updatePlaces(ticket.film, ticket.session, place);
    }
    return { items: tickets, total: tickets.length };
  }
}
