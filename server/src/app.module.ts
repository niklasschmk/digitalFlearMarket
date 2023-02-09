import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user";
import {DataSource} from "typeorm";
import {Seller} from "./models/seller";
import {Product} from "./models/product";
import {OffererModule} from "./modules/offerer/offerer.module";
import {ProductsModule} from "./modules/products/products.module";
import {SellersModule} from "./modules/sellers/sellers.module";
import {UsersModule} from "./modules/users/users.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';





@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './db/digitalFlearMarket.sqlite',
        entities: [User, Seller, Product],
        synchronize: true,
        autoLoadEntities: true,
      }),
    //Import modules
    OffererModule,
    ProductsModule,
    SellersModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../client/frontend/dist/'),
    }),

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
