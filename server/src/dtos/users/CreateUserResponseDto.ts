import {ApiProperty} from "@nestjs/swagger";

export class CreateUserResponseDto{
    @ApiProperty()
    ok: boolean;

    constructor(ok: boolean) {
        this.ok = ok;
    }
}