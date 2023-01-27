import {Module} from "@nestjs/common";
import {UsersModule} from "./users.module";
import {UserService} from "../../providers/user.service/user.service";
import {UsersController} from "../../controllers/users/users.controller";

@Module({
    imports: [UsersModule],
    providers: [UserService],
    controllers: [UsersController]
})
export class UsersHttpModule{

}