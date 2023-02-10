import {IsNumber} from "class-validator";
import {Seller} from "../../models/seller";

export class CreateFavoriteSellerReqDto {
    //@IsNumber()
    //favId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    seller: Seller;
}
