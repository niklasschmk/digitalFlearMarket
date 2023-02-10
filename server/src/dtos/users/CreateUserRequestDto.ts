import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserRequestDto{
    @IsString()
    @ApiProperty()
    firstname: string;

    @IsString()
    @ApiProperty()
    lastname: string;

    @IsString()
    @ApiProperty()
    phoneNumber: string;
}
