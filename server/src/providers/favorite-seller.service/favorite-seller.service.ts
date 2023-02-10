import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FavoriteProducts} from "../../models/favoriteProducts";
import {CreateFavoriteSellerReqDto} from "../../dtos/favoriteSeller/CreateFavoriteSellerReqDto";
import {FavoriteSeller} from "../../models/favoriteSeller";

@Injectable()
export class FavoriteSellerService {
    constructor(@InjectRepository(FavoriteSeller) private repo: Repository<FavoriteSeller>) {
    }

    async favorSeller(dto: CreateFavoriteSellerReqDto): Promise<FavoriteProducts> {
        const fp: FavoriteProducts = new FavoriteProducts(dto.favId, dto.userId, dto.sellerId);
        return this.repo.save(fp);
    }
}
