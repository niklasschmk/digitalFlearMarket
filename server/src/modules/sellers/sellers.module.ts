import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Seller} from "../../models/seller";
import {SellerService} from "../../providers/seller.service/seller.service";
import {SellerController} from "../../controllers/seller/seller.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Seller])],
    providers: [SellerService],
    controllers: [SellerController],
    exports: [TypeOrmModule]
})
export class SellersModule {}
