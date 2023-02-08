import {PartialType} from "@nestjs/swagger";
import {CreateSellerResponseDto} from "./CreateSellerResponseDto";

export class UpdateSellerResponseDto extends PartialType(CreateSellerResponseDto){
    constructor(ok: boolean) {
        super(ok);
    }
}