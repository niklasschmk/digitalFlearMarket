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
import {SellerService} from "../../providers/seller.service/seller.service";
import {Seller} from "../../models/seller";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly offererService: OffererService, private readonly sellerService: SellerService) {
    }

    @Get('checkLogin')
    async checkLogin(@Session() session: ISession): Promise<{ user: Offerer | Seller, role: string }>{
        try {
            if (session.isLoggedIn){
                if (session.role==='Offerer'){
                    const user = await this.offererService.getOffererByUsername(session.username);
                    const role = session.role;
                    return Promise.resolve({ user, role });
                }else{
                    const user = await this.sellerService.getSellerByUsername(session.username);
                    const role = session.role;
                    return Promise.resolve({ user, role });
                }
            }
        } catch (e) {
            throw new BadRequestException('Something went wrong', {cause: e, description: 'Error description'});
        }
    }

    @Post('login')
    @ApiResponse({type: LoginReqDto})
    async login(@Session() session: ISession, @Body() body: LoginReqDto): Promise<LoginResDto> {
        try {
            const role: string = await this.authService.login(session, body);
            console.log(role);
            session.isLoggedIn = true;
            session.role = role;
            session.username = body.username;
            console.log(session);
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
