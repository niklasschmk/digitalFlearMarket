import {PartialType} from "@nestjs/swagger";
import {CreateFavoriteProductResDto} from "./CreateFavoriteProductResDto";

export class UpdateFavoriteProductResDto extends PartialType(CreateFavoriteProductResDto) {
    constructor(ok: boolean) {
        super(ok);
    }
}