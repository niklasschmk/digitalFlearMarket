import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user";
import {DataSource} from "typeorm";
import {Seller} from "./models/seller";
import {Product} from "./models/product";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './db/digitalFlearMarket.sqlite',
        entities: [User, Seller, Product],
        synchronize: true,
        autoLoadEntities: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
  }
}
