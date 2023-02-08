import {PartialType} from "@nestjs/swagger";
import {CreateSellerRequestDto} from "./CreateSellerRequestDto";

export class UpdateSellerRequestDto extends PartialType(CreateSellerRequestDto){
    constructor(ok: boolean) {
        super(ok);
    }
}