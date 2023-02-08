import {PartialType} from "@nestjs/swagger";
import {CreateProductRequestDto} from "./CreateProductRequestDto";

export class UpdateProductRequestDto extends PartialType(CreateProductRequestDto) {
    constructor() {
        super();
    }
}