import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavoriteSeller} from "../../models/favoriteSeller";
import {FavoriteSellerService} from "../../providers/favorite-seller.service/favorite-seller.service";

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteSeller])],
    providers: [FavoriteSellerService],
    controllers: [],
    exports: [TypeOrmModule],
})
export class FavoriteSellerModule {}
