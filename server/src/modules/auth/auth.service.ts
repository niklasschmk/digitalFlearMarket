import {Injectable, Session, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../../providers/user.service/user.service";
import {LoginReqDto} from "../../dtos/auth/LoginReqDto";
import {RegisterReqDto} from "../../dtos/auth/RegisterReqDto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../models/user";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt"
import {Offerer} from "../../models/offerer";
import {ISession} from "../../ISession";
import {Seller} from "../../models/seller";
import {OffererService} from "../../providers/offerer.service/offerer.service";
import {SellerService} from "../../providers/seller.service/seller.service";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Seller) private sellerRepo: Repository<Seller>,
                @InjectRepository(Offerer) private offererRepo: Repository<Offerer>,
                private readonly offererService: OffererService,
                private readonly sellerService: SellerService) {
    }
    async login(session: ISession,dto: LoginReqDto): Promise<string> {
        const offerer: Offerer = await this.offererService.getOffererByUsername(dto.username);
        const seller: Seller = await this.sellerService.getSellerByUsername(dto.username);
        if (offerer) {
            if (this.checkPassword(dto, offerer.hashedPassword, 'Offerer', session)) return 'Offerer';
        }
        if (seller) {
            if (this.checkPassword(dto, seller.hashedPassword, 'Seller', session)) return 'Seller';
        }
    }

    checkPassword(dto: LoginReqDto, hashedPassword: string, role: string, session: ISession): boolean {
        bcrypt.compare(dto.password, hashedPassword, function (err, result) {
            if (result) {
                return true;
            } else {
                throw new UnauthorizedException();
            }
        });
        return false;
    }

    /*OLD FUNCTION
        checkPassword(dtoPassword: string, hashedPassword: string, role: string, session: ISession): boolean {
        if (dtoPassword===hashedPassword){
            session.isLoggedIn = true;
            //session.role = role;
            return true;
        } else {
            throw new UnauthorizedException();
        }
        ;
        return false;
    }

     */

    register(dto: RegisterReqDto): Offerer {
        const saltRounds: number = 10;
        let offerer: Offerer;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(dto.hashedPassword, salt, function (err, hash) {
                console.log(hash);
                offerer = new Offerer(dto.username, hash, dto.firstname, dto.lastname, dto.phoneNumber);
            });
        });
        return offerer;
    }

    async hashingPassword(password: string): Promise<string>{
        const saltRounds: number = 10;
        let hashedPassword: string;
        console.log(password);
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                console.log(hash);
                hashedPassword = hash;
            });
        });
        console.log(hashedPassword);
        return hashedPassword;
    }
}
