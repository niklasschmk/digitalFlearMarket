import {Body, Controller, Post, Session} from '@nestjs/common';
import {AuthService} from "../../modules/auth/auth.service";
import {ApiResponse} from "@nestjs/swagger";
import {LoginReqDto} from "../../dtos/auth/LoginReqDto";
import {LoginResDto} from "../../dtos/auth/LoginResDto";
import {ISession} from "../../ISession";
import {RegisterReqDto} from "../../dtos/auth/RegisterReqDto";
import {RegisterResDto} from "../../dtos/auth/RegisterResDto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @Post('login')
    @ApiResponse({type: LoginReqDto})
    login(@Session() session: ISession, @Body() body: LoginReqDto): LoginResDto {
        this.authService.login(session, body);
        return new LoginResDto(true);
    }

    @Post('register')
    @ApiResponse({type: RegisterReqDto})
    register(@Body() body: RegisterReqDto): RegisterResDto {
        this.authService.register(body);
        return new RegisterResDto(true);
    }

    @Post('logut')
    logout(@Session() session: ISession): void {
        this.authService.logout(session);
    }
}
