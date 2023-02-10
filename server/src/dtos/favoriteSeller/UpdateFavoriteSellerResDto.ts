import {PartialType} from "@nestjs/swagger";
import {CreateFavoriteSellerResDto} from "./CreateFavoriteSellerResDto";

export class UpdateFavoriteSellerResDto extends PartialType(CreateFavoriteSellerResDto) {
    constructor(ok: boolean) {
        super(ok);
    }
}