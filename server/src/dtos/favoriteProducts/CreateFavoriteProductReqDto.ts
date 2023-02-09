import {IsNumber} from "class-validator";

export class CreateFavoriteProductReqDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    productId: number;
}