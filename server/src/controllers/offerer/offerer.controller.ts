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
import {OffererService} from "../../providers/offerer.service/offerer.service";
import {Offerer} from "../../models/offerer";
import {ApiResponse} from "@nestjs/swagger";
import {CreateOffererRequestDto} from "../../dtos/offerers/CreateOffererRequestDto";
import {CreateOffererResponseDto} from "../../dtos/offerers/CreateOffererResponseDto";
import {UpdateOffererRequestDto} from "../../dtos/offerers/UpdateOffererRequestDto";
import {UpdateOffererResponseDto} from "../../dtos/offerers/UpdateOffererResponseDto";
import {CreateFavoriteProductReqDto} from "../../dtos/favoriteProducts/CreateFavoriteProductReqDto";
import {CreateFavoriteProductResDto} from "../../dtos/favoriteProducts/CreateFavoriteProductResDto";
import {CreateFavoriteSellerReqDto} from "../../dtos/favoriteSeller/CreateFavoriteSellerReqDto";
import {CreateFavoriteSellerResDto} from "../../dtos/favoriteSeller/CreateFavoriteSellerResDto";

@Controller('offerer')
export class OffererController {
    constructor(private readonly offererService: OffererService) {
    }

    @Get('/offerers')
    async getAllOfferers(): Promise<Offerer[]> {
        let offerers: Offerer[] = [];
        try {
            offerers = await this.offererService.getAllOfferers();
            return offerers;
        }catch (e) {
            throw new BadRequestException('Something went wrong', {cause: e});
        }
    }

    @Get('/:userId')
    getOffererById(@Param('userId', ParseIntPipe) userId: number): Promise<Offerer> {
        try {
            return this.offererService.getOffererById(userId);
        } catch (err) {
            throw new NotFoundException('There is no user with this id', {cause: err, description: 'An user with this id was not found.'})
        }
    }

    @Post('favorProduct')
    @ApiResponse({type: CreateFavoriteProductReqDto})
    favorProduct(@Body() body: CreateFavoriteProductReqDto): CreateFavoriteProductResDto {
        try {
            this.offererService.favorProduct(body);
            return new CreateFavoriteProductResDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Post('favorSeller')
    @ApiResponse({type: CreateFavoriteSellerReqDto})
    favorSeller(@Body() body: CreateFavoriteSellerReqDto): CreateFavoriteSellerResDto {
        try {
            this.offererService.favorSeller(body);
            return new CreateFavoriteSellerResDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Post('/newOfferer')
    @ApiResponse({type: CreateOffererRequestDto})
    createNewSeller(@Body() body: CreateOffererRequestDto): CreateOffererResponseDto {
        try {
            this.offererService.createNewOfferer(body);
            return new CreateOffererResponseDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Put('/updateOfferer/:userId')
    updateOfferer(@Param('userId', ParseIntPipe) userId: number,
                 @Body() body: UpdateOffererRequestDto): UpdateOffererResponseDto {
        try {
            this.offererService.updateOfferer(userId, body);
            return new UpdateOffererResponseDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Delete('deleteOfferer/:userId')
    deleteSellerById(@Param('userId', ParseIntPipe) userId: number): void {
        try {
            this.offererService.remove(userId);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }
}
