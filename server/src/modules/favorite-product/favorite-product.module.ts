import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavoriteProducts} from "../../models/favoriteProducts";
import {FavoriteProductService} from "../../providers/favorite-product.service/favorite-product.service";

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteProducts])],
    providers: [FavoriteProductService],
    controllers: [],
    exports: [TypeOrmModule],
})
export class FavoriteProductModule {}
