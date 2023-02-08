import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../models/user";
import {UserService} from "../../providers/user.service/user.service";
import {UsersController} from "../../controllers/users/users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UsersController],
    exports: [TypeOrmModule, UserService]
})
export class UsersModule {}
