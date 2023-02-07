import { Injectable } from '@nestjs/common';
import {UserService} from "../../providers/user.service/user.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }

}
