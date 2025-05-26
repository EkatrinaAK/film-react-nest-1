import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";

import {configProvider} from "./app.config.provider";

@Module({
  imports: [
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      // @todo: Добавьте раздачу статических файлов из public
       ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
