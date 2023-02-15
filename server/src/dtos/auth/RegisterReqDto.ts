import {IsString} from "class-validator";
import {Column} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterReqDto {
    @IsString()
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    hashedPassword: string;

    @Column()
    @ApiProperty()
    firstname: string;

    @Column()
    @ApiProperty()
    lastname: string;

    @Column()
    @ApiProperty()
    phoneNumber: string;
}