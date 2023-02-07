import {PartialType} from "@nestjs/swagger";
import {CreateOffererResponseDto} from "./CreateOffererResponseDto";

export class UpdateOffererResponseDto extends PartialType(CreateOffererResponseDto) {
    constructor(ok: boolean) {
        super(ok);
    }
}