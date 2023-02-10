import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put, UseGuards
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
import {UpdateFavoriteProductReqDto} from "../../dtos/favoriteProducts/UpdateFavoriteProductReqDto";
import {UpdateFavoriteProductResDto} from "../../dtos/favoriteProducts/UpdateFavoriteProductResDto";
import {UpdateFavoriteSellerReqDto} from "../../dtos/favoriteSeller/UpdateFavoriteSellerReqDto";
import {UpdateFavoriteSellerResDto} from "../../dtos/favoriteSeller/UpdateFavoriteSellerResDto";
import {AuthGuard} from "../../guards/auth/auth.guard";

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
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    @ApiResponse({type: CreateFavoriteSellerReqDto})
    favorSeller(@Body() body: CreateFavoriteSellerReqDto): CreateFavoriteSellerResDto {
        try {
            this.offererService.favorSeller(body);
            return new CreateFavoriteSellerResDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }
/*
    @Post('/newOfferer')
    @ApiResponse({type: CreateOffererRequestDto})
    createNewSeller(@Body() body: CreateOffererRequestDto): CreateOffererResponseDto {
        try {
            this.offererService.createNewOfferer(body);
            return new CreateOffererResponseDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }*/

    @Put('/noLongerFavorProduct/:userId')
    @UseGuards(AuthGuard)
    noLongerFavorProduct(@Param('userId', ParseIntPipe) userId: number,
                         @Body() body: UpdateFavoriteProductReqDto): UpdateFavoriteProductResDto {
        try {
            this.offererService.noLongerFavorProduct(userId, body);
            return new UpdateFavoriteProductResDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Put('/noLongerFavorSeller/:userId')
    @UseGuards(AuthGuard)
    noLongerFavorSeller(@Param('userId', ParseIntPipe) userId: number,
                         @Body() body: UpdateFavoriteSellerReqDto): UpdateFavoriteSellerResDto {
        try {
            this.offererService.noLongerFavorSeller(userId, body);
            return new UpdateFavoriteSellerResDto(true);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }

    @Put('/updateOfferer/:userId')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    deleteSellerById(@Param('userId', ParseIntPipe) userId: number): void {
        try {
            this.offererService.remove(userId);
        } catch (err) {
            throw new BadRequestException('Something went wrong', {cause: err, description: 'Error description'});
        }
    }
}
