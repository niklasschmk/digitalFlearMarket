import {PartialType} from "@nestjs/swagger";
import {CreateFavoriteSellerReqDto} from "./CreateFavoriteSellerReqDto";

export class UpdateFavoriteSellerReqDto extends PartialType(CreateFavoriteSellerReqDto) {
    constructor() {
        super();
    }
}