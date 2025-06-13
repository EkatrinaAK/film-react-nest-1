import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const testData = {
    tickets: [
      {
        film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        session: '0cf8b68c-fcf2-4c0a-97ba-45990231fa0e',
        daytime: '2025-02-03',
        day: 'Monday',
        time: '12:00',
        row: 1,
        seat: 1,
        price: 350,
      },
    ],
    email: 'test@mail.ru',
    phone: '+79000000000',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        create: jest.fn().mockResolvedValue({
          total: testData.tickets.length,
          items: testData.tickets,
        }),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('.createOrder() shold create order and return result', async () => {
    const result = await controller.getFilms(testData);
    expect(result).toEqual({
      total: testData.tickets.length,
      items: testData.tickets,
    });
    expect(service.createOrder).toHaveBeenCalledWith(testData);
  });
});