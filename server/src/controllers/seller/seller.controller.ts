import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put
} from '@nestjs/common';
import {SellerService} from "../../providers/seller.service/seller.service";
import {Seller} from "../../models/seller";
import {ApiResponse} from "@nestjs/swagger";
import {CreateSellerRequestDto} from "../../dtos/sellers/CreateSellerRequestDto";
import {CreateSellerResponseDto} from "../../dtos/sellers/CreateSellerResponseDto";
import {UpdateSellerRequestDto} from "../../dtos/sellers/UpdateSellerRequestDto";
import {UpdateSellerResponseDto} from "../../dtos/sellers/UpdateSellerResponseDto";
import {CreateFavoriteSellerReqDto} from "../../dtos/favoriteSeller/CreateFavoriteSellerReqDto";
import {CreateFavoriteSellerResDto} from "../../dtos/favoriteSeller/CreateFavoriteSellerResDto";
import {FavoriteSellerService} from "../../providers/favorite-seller.service/favorite-seller.service";

@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) {
    }

    @Get('/sellers')
    async getAllSellers(): Promise<Seller[]> {
        let sellers: Seller[] = [];
        try {
            sellers = await this.sellerService.getAllSellers();
            return sellers;
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Get('/:userId')
    getSellerById(@Param('userId', ParseIntPipe) userId: number): Promise<Seller> {
        try {
            return this.sellerService.getSellerById(userId);
        } catch (err) {
            throw new NotFoundException('There is no user with this id', {cause: err, description: 'An user with this id was not found.'})
        }
    }
/*
    @Post('favorSeller')
    @ApiResponse({type: CreateFavoriteSellerReqDto})
    favorProduct(@Body() body: CreateFavoriteSellerReqDto): CreateFavoriteSellerResDto {
        this.favoriteSellerService.favorSeller(body);
        return new CreateFavoriteSellerResDto(true);
    }*/

    @Post('/newSeller')
    @ApiResponse({type: CreateSellerRequestDto})
    createNewSeller(@Body() body: CreateSellerRequestDto): CreateSellerResponseDto {
       try {
           this.sellerService.createNewSeller(body);
           return new CreateSellerResponseDto(true);
       } catch (err) {
           throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
       }
    }

    @Put('/updateSeller/:userId')
    updateSeller(@Param('userId', ParseIntPipe) userId: number,
                 @Body() body: UpdateSellerRequestDto): UpdateSellerResponseDto {
        try {
            this.sellerService.updateSeller(userId, body);
            return new UpdateSellerResponseDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Delete('deleteSeller/:userId')
    deleteSellerById(@Param('userId', ParseIntPipe) userId: number): void {
        try {
            this.sellerService.remove(userId);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }
}
