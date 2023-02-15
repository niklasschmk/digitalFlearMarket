import {BadRequestException, Body, Controller, Get, Post, Session} from '@nestjs/common';
import {AuthService} from "../../modules/auth/auth.service";
import {ApiResponse} from "@nestjs/swagger";
import {LoginReqDto} from "../../dtos/auth/LoginReqDto";
import {LoginResDto} from "../../dtos/auth/LoginResDto";
import {ISession} from "../../ISession";
import {RegisterReqDto} from "../../dtos/auth/RegisterReqDto";
import {RegisterResDto} from "../../dtos/auth/RegisterResDto";
import {OffererService} from "../../providers/offerer.service/offerer.service";
import {Offerer} from "../../models/offerer";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly offererService: OffererService) {
    }
    
    @Get('checkLogin')
    checkLogin(@Session() session: ISession): Promise<Offerer>{
        try {
            if (session.isLoggedIn){
                return this.offererService.getOffererByUsername(session.username);
            }
        } catch (e) {
            throw new BadRequestException();
        }

    }

    @Post('login')
    @ApiResponse({type: LoginReqDto})
    login(@Session() session: ISession, @Body() body: LoginReqDto): LoginResDto {
        this.authService.login(session, body).then();
        return new LoginResDto(true);
    }
/* Old register
    @Post('register')
    @ApiResponse({type: RegisterReqDto})
    register(@Body() body: RegisterReqDto): RegisterResDto {
        this.authService.register(body);
        return new RegisterResDto(true);
    }*/

    @Post('register')
    @ApiResponse({type: RegisterReqDto})
    async register(@Body() body: RegisterReqDto): Promise<RegisterResDto> {
        const hashedPassword: string = this.authService.hashingPassword(body.hashedPassword);
        body.hashedPassword = hashedPassword;
        await this.offererService.createNewOfferer(body);
        return new RegisterResDto(true);
    }

    @Post('logout')
    logout(@Session() session: ISession): void {
        this.authService.logout(session);
    }
}
