import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../../models/product";
import {ProductService} from "../../providers/product.service/product.service";
import {ProductController} from "../../controllers/product/product.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [TypeOrmModule]
})
export class ProductsModule {}
