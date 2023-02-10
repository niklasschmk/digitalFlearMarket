import {IsNumber} from "class-validator";

export class CreateFavoriteSellerReqDto {
    @IsNumber()
    favId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    sellerId: number;
}
