import {IsNumber} from "class-validator";

export class CreateFavoriteSellerReqDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    sellerId: number;
}