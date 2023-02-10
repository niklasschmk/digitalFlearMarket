import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateOffererRequestDto {
    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    hashedPassword: string;

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