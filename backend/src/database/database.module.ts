import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { applicationConfig } from '../app.config.provider';
import { Film, FilmSchema } from '../films/schemas/film.schema';
import { AppConfig } from '../app.config.provider';
import { FilmsMongoRepository } from '../repository/films.mongo.repository';
import { FilmsPostgresRepository } from '../repository/films.postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule as ScheduleEntity } from '../films/entities/schedule.entity';
import { Film as FilmEntity } from '../films/entities/film.entity';


@Module({})
export class DatabaseModule {
  static register(appConfig: AppConfig): DynamicModule {
    const imports = [];
    const providers = [];
    const exports = [];

    switch (appConfig.database.driver) {
      case 'mongodb':
        imports.push(
          MongooseModule.forRoot(appConfig.database.url),
          MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsMongoRepository,
        });
        exports.push('FILMS_REPOSITORY');
        break;  

        case 'postgres':
      default:
        imports.push(
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: appConfig.database.host,
            port: appConfig.database.port,
            username: appConfig.database.username,
            password: appConfig.database.password,
            database: appConfig.database.database,
            entities: [FilmEntity, ScheduleEntity],
            synchronize: false,
          }),
          TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsPostgresRepository,
        });
        exports.push('FILMS_REPOSITORY');
        break;
    }
    return {
      module: DatabaseModule,
      imports,
      providers,
      exports,
    };

  } 
}
