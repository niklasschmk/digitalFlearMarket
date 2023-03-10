import {
    BadRequestException, Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post, Put,
    Req,
    Res, UseGuards
} from '@nestjs/common';
import {Product} from "../../models/product";
import {ProductService} from "../../providers/product.service/product.service";
import {CreateProductRequestDto} from "../../dtos/products/CreateProductRequestDto";
import {CreateProductResponseDto} from "../../dtos/products/CreateProductResponseDto";
import {ApiResponse} from "@nestjs/swagger";
import {UpdateProductRequestDto} from "../../dtos/products/UpdateProductRequestDto";
import {UpdateProductResponseDto} from "../../dtos/products/UpdateProductResponseDto";
import {FavoriteProductService} from "../../providers/favorite-product.service/favorite-product.service";
import {CreateFavoriteProductReqDto} from "../../dtos/favoriteProducts/CreateFavoriteProductReqDto";
import {CreateFavoriteProductResDto} from "../../dtos/favoriteProducts/CreateFavoriteProductResDto";
import {AuthGuard} from "../../guards/auth/auth.guard";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Get('/products')
    async getAllProducts(): Promise<Product[]> {
        let products: Product[] = []
        try {
            products = await this.productService.getAllProducts();
            return products;
        } catch (err) {
            throw new BadRequestException('Something bad happened', { cause: err, description: 'Some error description' })
        }
    }

    @Get(':productId')
    getProductById(@Param('productId', ParseIntPipe) productId: number): Promise<Product> {
        try {
            return this.productService.getProductById(productId);
        }catch (err) {
            throw new NotFoundException('There is no product with this id', {cause: err, description: 'A product with this id was not found.'})
        }
    }

    @Get('/productsOfSeller/:sellerId')
    async getProductsOfSeller(@Param('sellerId', ParseIntPipe) sellerId: number): Promise<Product[]> {
        let products: Product[] = []
        try {
            products = await this.productService.getProductsOfSeller(sellerId);
            return products;
        } catch (err) {
            throw new BadRequestException('Something bad happened', { cause: err, description: 'Some error description' })
        }
    }

/*    @Post('favorProduct')
    @ApiResponse({type: CreateFavoriteProductReqDto})
    favorProduct(@Body() body: CreateFavoriteProductReqDto): CreateFavoriteProductResDto {
        this.favoriteProductService.favorProduct(body);
        return new CreateFavoriteProductResDto(true);
    }*/

    @Post('/newProduct')
    @UseGuards(AuthGuard)
    @ApiResponse({type: CreateProductRequestDto})
    createNewProduct(@Body() body: CreateProductRequestDto): CreateProductResponseDto {
        this.productService.createNewProduct(body);
        return new CreateProductResponseDto(true);
    }

    @Put('updateProduct/:productId')
    @UseGuards(AuthGuard)
    updateProduct(@Param('productId', ParseIntPipe) productId: number,
                  @Body() body: UpdateProductRequestDto): UpdateProductResponseDto {
        this.productService.updateProduct(productId, body);
        return new UpdateProductResponseDto(true);
    }

    @Delete('/delete/:productId')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('productId', ParseIntPipe) productId: number): void {
        this.productService.remove(productId);
    }
}
