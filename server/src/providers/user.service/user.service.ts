import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../models/user";
import {DataSource, Repository} from "typeorm";
import {CreateUserRequestDto} from "../../dtos/users/CreateUserRequestDto";
import {UpdateUserRequestDto} from "../../dtos/users/UpdateUserRequestDto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getUserById(userId: number): Promise<User> {
        return this.usersRepository.findOneBy({ userId });
    }

    async createNewUser(dto: CreateUserRequestDto): Promise<User>{
        const user: User = new User(dto.firstname, dto.lastname, dto.phoneNumber);
        return this.usersRepository.save(user);
    }

    async updateUser(userId: number, dto: UpdateUserRequestDto): Promise<void> {
        await this.usersRepository.update(userId, {
            firstname: dto.firstname,
            lastname: dto.lastname,
            phoneNumber: dto.phoneNumber,
        });
    }

    async remove(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
    }
}
