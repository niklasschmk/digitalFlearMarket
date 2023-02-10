import {PartialType} from "@nestjs/swagger";
import {CreateFavoriteProductReqDto} from "./CreateFavoriteProductReqDto";

export class UpdateFavoriteProductReqDto extends PartialType(CreateFavoriteProductReqDto) {
    constructor() {
        super();
    }
}