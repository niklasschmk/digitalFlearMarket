import { Injectable } from '@nestjs/common';
import {Product} from "../../models/product";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateProductRequestDto} from "../../dtos/products/CreateProductRequestDto";
import {UpdateProductRequestDto} from "../../dtos/products/UpdateProductRequestDto";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {
    }

    getAllProducts(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    getProductById(productId: number): Promise<Product> {
        return this.productsRepository.findOneBy({productId});
    }

    async createNewProduct(dto: CreateProductRequestDto): Promise<Product> {
        const product: Product = new Product(dto.userId, dto.name, dto.price, dto.negotiable, dto.description);
        return this.productsRepository.save(product);
    }

    async updateProduct(productId: number, dto: UpdateProductRequestDto): Promise<void> {
        await this.productsRepository.update(productId, {
            userId: dto.userId,
            name: dto.name,
            price: dto.price,
            negotiable: dto.negotiable,
            description: dto.description,
        });
    }

    async remove(productId: string): Promise<void> {
        await this.productsRepository.delete(productId);
    }
}
