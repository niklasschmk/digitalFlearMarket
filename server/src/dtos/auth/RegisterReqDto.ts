import {IsString} from "class-validator";
import {Column} from "typeorm";

export class RegisterReqDto {
    @IsString()
    username: string;

    @Column()
    hashedPassword: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phoneNumber: string;
}