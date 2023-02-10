import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FavoriteProducts} from "../../models/favoriteProducts";
import {Repository} from "typeorm";
import {CreateFavoriteProductReqDto} from "../../dtos/favoriteProducts/CreateFavoriteProductReqDto";

@Injectable()
export class FavoriteProductService {
    constructor(@InjectRepository(FavoriteProducts) private repo: Repository<FavoriteProducts>) {
    }
/*
    async favorProduct(dto: CreateFavoriteProductReqDto): Promise<FavoriteProducts> {
        const fp: FavoriteProducts = new FavoriteProducts(dto.favId, dto.userId, dto.productId);
        return this.repo.save(fp);
    }*/
}
