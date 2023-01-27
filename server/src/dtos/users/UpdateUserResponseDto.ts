import {PartialType} from "@nestjs/swagger";
import {CreateUserResponseDto} from "./CreateUserResponseDto";

export class UpdateUserResponseDto extends PartialType(CreateUserResponseDto){
    constructor(ok: boolean) {
        super(ok);
    }
}