import {IsNumber} from "class-validator";

export class CreateFavoriteProductReqDto {
    @IsNumber()
    favId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    productId: number;
}
