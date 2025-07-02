import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const testData = {
    tickets: [
      {
        "film": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
        "session": "5beec101-acbb-4158-adc6-d855716b44a8",
        "daytime": "2024-06-28T14:00:53+03:00",
        "day": "28 июня",
        "time": "14:00",
        "row": 1,
        "seat": 1,
        "price": 350
      },
    ],
    email: 'ekaterina.kuznetz@yandex.ru',
    phone: '+79233552539',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue({
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

  it('.getFilms() shold create order and return result', async () => {
    const result = await controller.getFilms(testData);
    expect(result).toEqual({
      total: testData.tickets.length,
      items: testData.tickets,
    });
    expect(service.createOrder).toHaveBeenCalledWith(testData);
  });
});