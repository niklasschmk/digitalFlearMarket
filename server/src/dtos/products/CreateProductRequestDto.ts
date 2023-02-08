import {IsArray, IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateProductRequestDto{
    @IsNumber()
    userId: number;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    negotiable: boolean;

    @IsString()
    description: string;
}