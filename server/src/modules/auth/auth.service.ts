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

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Seller) private sellerRepo: Repository<Seller>,
                @InjectRepository(Offerer) private offererRepo: Repository<Offerer>) {
    }
    async login(session: ISession,dto: LoginReqDto): Promise<boolean> {
        const offerer: Offerer = await this.offererRepo.findOneBy({
            username: dto.username,
        });
        const seller: Seller = await this.sellerRepo.findOneBy({
            username: dto.username,
        });
        if (offerer) {
            return this.checkPassword(dto.password, offerer.hashedPassword, 'Offerer', session);
        }
        if (seller) {
            return this.checkPassword(dto.password, seller.hashedPassword, 'Seller', session);
        }
    }

    checkPassword(dtoPassword: string, hashedPassword: string, role: string, session: ISession): boolean {
        if (dtoPassword===hashedPassword){
            session.isLoggedIn = true;
            session.role = role;
            return true;
        } else {
            throw new UnauthorizedException();
        }
        ;
        return false;
    }
    /*OLD FUNCTION
    checkPassword(dtoPassword: string, hashedPassword: string, role: string, session: ISession): boolean {
        bcrypt.compare(dtoPassword, hashedPassword, function (err, result) {
            if (result) {
                session.isLoggedIn = true;
                session.role = role;
                return true;
            } else {
                throw new UnauthorizedException();
            }
        });
        return false;
    }

     */

    register(dto: RegisterReqDto) {
        const saltRounds: number = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(dto.hashedPassword, salt, function (err, hash) {
                const offerer: Offerer = new Offerer(dto.username, hash, dto.firstname, dto.lastname, dto.phoneNumber);
                this.offererRepo.save(offerer);
            });
        });
    }

    logout(session: ISession) {
        session.isLoggedIn = undefined;
        session.role = undefined;
    }
}
