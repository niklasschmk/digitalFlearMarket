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
import * as bcrypt from "bcrypt";


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
            throw new BadRequestException('Something went wrong', {cause: e, description: 'Error description'});
        }

    }

    @Post('login')
    @ApiResponse({type: LoginReqDto})
    login(@Session() session: ISession, @Body() body: LoginReqDto): LoginResDto {
        try {
            this.authService.login(session, body).then(role => {
                if (role){
                    session.isLoggedIn = true;
                    session.role = role;
                    session.username = body.username;
                }
            });
            return new LoginResDto(true);
        } catch (e) {
            throw new BadRequestException('Something went wrong', {cause: e, description: 'Error description'});
        }
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
        /*
        const hashedPassword: string = await this.authService.hashingPassword(body.hashedPassword);
        console.log(hashedPassword);
        console.log(body.hashedPassword);
        body.hashedPassword = hashedPassword;
        console.log(body.hashedPassword);
        await this.offererService.createNewOfferer(body);*/
        //const offerer: Offerer = this.authService.register(body);
        //body.hashedPassword = offerer.hashedPassword;
        try {
            this.offererService.createNewOfferer(body);
            return new RegisterResDto(true);
        } catch (e) {
            throw new BadRequestException('Something went wrong', {cause: e, description: 'Error description'});
        }
    }

    @Post('logout')
    logout(@Session() session: ISession): void {
        try {
            session.isLoggedIn = false;
            session.role = 'undefined';
            session.username = '';
        } catch (e) {
            throw new BadRequestException('Something went wrong', {cause: e, description: 'Error description'});
        }
    }
}
