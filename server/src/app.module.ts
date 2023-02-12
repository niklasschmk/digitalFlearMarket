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
import {FavoriteProductModule} from "./modules/favorite-product/favorite-product.module";
import {FavoriteSellerModule} from "./modules/favorite-seller/favorite-seller.module";
import {AuthModule} from "./modules/auth/auth.module";





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
    AuthModule,
    OffererModule,
    ProductsModule,
    SellersModule,
    UsersModule,
    FavoriteProductModule,
    FavoriteSellerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../client/DigitalFlearMarketClient/dist/'),
    }),

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
