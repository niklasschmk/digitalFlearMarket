import {PartialType} from "@nestjs/swagger";
import {CreateUserRequestDto} from "./CreateUserRequestDto";

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto){}