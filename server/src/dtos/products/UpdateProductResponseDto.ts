import {PartialType} from "@nestjs/swagger";
import {CreateProductResponseDto} from "./CreateProductResponseDto";

export class UpdateProductResponseDto extends PartialType(CreateProductResponseDto) {
    constructor(ok: boolean) {
        super(ok);
    }
}