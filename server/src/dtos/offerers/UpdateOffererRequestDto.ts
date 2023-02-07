import {PartialType} from "@nestjs/swagger";
import {CreateOffererRequestDto} from "./CreateOffererRequestDto";

export class UpdateOffererRequestDto extends PartialType(CreateOffererRequestDto) {
    constructor(ok: boolean) {
        super(ok);
    }
}