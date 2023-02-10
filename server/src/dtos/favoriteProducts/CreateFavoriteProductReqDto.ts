import {IsNumber} from "class-validator";
import {Product} from "../../models/product";

export class CreateFavoriteProductReqDto {
    //@IsNumber()
    //favId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    product: Product;
}
