import { ConfigModule } from '@nestjs/config';

export const applicationConfig = process.env;
export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //TODO прочесть переменнные среды
    database: {
      driver: applicationConfig.DATABASE_DRIVER,
      url: applicationConfig.DATABASE_URL || 'postgresql://localhost',
      host: applicationConfig.DATABASE_HOST || 'postgres',
      port: applicationConfig.DATABASE_PORT || 5432,
      username: applicationConfig.DATABASE_USERNAME || 'prac',
      password: applicationConfig.DATABASE_PASSWORD || 'prac',
      database: applicationConfig.DATABASE_NAME || 'prac',
    },
    logger: applicationConfig.LOGGER || 'DEV',
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
