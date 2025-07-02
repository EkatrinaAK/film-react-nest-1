import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const testFilms = [
    {
      id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      rating: 2,
      director: 'Итан Райт',
      tags: 'Документальный',
      image: '/bg1s.jpg',
      cover: '/bg1c.jpg',
      title: 'Архитекторы общества',
      about:
        'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
      description:
        'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
      schedule: [],
    },
    {
      id: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
      rating: 9,
      director: 'Харрисон Рид',
      tags: 'Рекомендуемые',
      image: '/bg3s.jpg',
      cover: '/bg3c.jpg',
      title: 'Недостижимая утопия',
      about:
        'Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.',
      description:
        'Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.',
      schedule: [],
    },
  ];

  const testSchedules = [
    {
      id: '0cf8b68c-fcf2-4c0a-97ba-45990231fa0e',
      daytime: '2024-06-29T17:00:53+03:00',
      hall: 2,
      rows: 5,
      seats: 10,
      price: 350,
      taken: '',
      filmId: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    },
    {
      id: '2519ca34-32b4-4a7f-971d-3bb585c6450b',
      daytime: '2024-06-30T12:00:53+03:00',
      hall: 0,
      rows: 5,
      seats: 10,
      price: 350,
      taken: '',
      filmId: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAll: jest.fn().mockResolvedValue(testFilms),
        getScheduleFilm: jest.fn().mockResolvedValue({
          total: testSchedules.length,
          items: testSchedules,
        }),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('.getFilms() should get films', async () => {
    const result = await controller.getFilms();
    expect(result).toEqual(testFilms);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('.getchedule() should get schedules by film', async () => {
    const result = await controller.getSchedule(testFilms[0].id);
    expect(service.getScheduleFilm).toHaveBeenCalledWith(testFilms[0].id);
    expect(result).toEqual({
      total: testSchedules.length,
      items: testSchedules,
    });
  });
});