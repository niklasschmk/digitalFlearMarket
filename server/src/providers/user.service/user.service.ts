import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../models/user";
import {DataSource, Repository} from "typeorm";
import {CreateUserRequestDto} from "../../dtos/users/CreateUserRequestDto";
import {UpdateUserRequestDto} from "../../dtos/users/UpdateUserRequestDto";
import {MessageResultDto} from "../../dtos/MessageResultDto";
import {LoginReqDto} from "../../dtos/auth/LoginReqDto";
import {ISession} from "../../ISession";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getUserById(userId: number): Promise<User> {
        return this.usersRepository.findOneBy({ userId });
    }

    async adminLogin(session: ISession, dto: LoginReqDto): Promise<boolean> {
        const user: User = await this.usersRepository.findOneBy({
            username: dto.username,
        });
        if (user) {
            return this.checkPassword(dto.password, user.hashedPassword, session);
        }
    }

    checkPassword(dtoPassword: string, hashedPassword: string, session: ISession): boolean {
        bcrypt.compare(dtoPassword, hashedPassword, function (err, result) {
            if (result) {
                session.isLoggedIn = true;
                return true;
            } else {
                throw new UnauthorizedException();
            }
        });
        return false;
    }

    async createNewUser(dto: CreateUserRequestDto): Promise<User>{
        const user: User = new User(dto.firstname, dto.lastname, dto.phoneNumber, dto.hashedPassword, dto.username);
        return this.usersRepository.save(user);
    }

    async updateUser(userId: number, dto: UpdateUserRequestDto): Promise<void> {
        await this.usersRepository.update(userId, {
            firstname: dto.firstname,
            lastname: dto.lastname,
            phoneNumber: dto.phoneNumber,
        });
    }

    async remove(userId: number): Promise<MessageResultDto> {
        const user: User | null = await this.usersRepository.findOneBy({
            userId: userId,
        });
        if (user == null){
            throw new NotFoundException();
        }
        await this.usersRepository.delete(user);
        return new MessageResultDto(`${user.firstname} ${user.lastname} wurde gelöscht!`);
    }
}
