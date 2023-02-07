import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSellerRequestDto {
    @IsString()
    @ApiProperty()
    firstname: string;

    @IsString()
    @ApiProperty()
    lastname: string;

    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsNumber()
    @ApiProperty()
    standNumber: number;
}