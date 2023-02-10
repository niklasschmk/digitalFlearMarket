import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Seller} from "../../models/seller";
import {CreateSellerRequestDto} from "../../dtos/sellers/CreateSellerRequestDto";
import {UpdateSellerRequestDto} from "../../dtos/sellers/UpdateSellerRequestDto";
import {MessageResultDto} from "../../dtos/MessageResultDto";
import * as bcrypt from "bcrypt";
import {Offerer} from "../../models/offerer";

@Injectable()
export class SellerService {
    constructor(@InjectRepository(Seller) private sellersRepository: Repository<Seller>) {
    }

    getAllSellers(): Promise<Seller[]> {
        return this.sellersRepository.find();
    }

    getSellerById(userId: number): Promise<Seller> {
        return this.sellersRepository.findOneBy({userId: userId});
    }

    async createNewSeller(dto: CreateSellerRequestDto): Promise<Seller> {
        const saltRounds: number = 10;
        let savedSeller;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(dto.hashedPassword, salt, function (err, hash) {
                const seller: Seller = new Seller(dto.username, hash, dto.firstname, dto.lastname, dto.phoneNumber, dto.standNumber);
                savedSeller = this.sellersRepository.save(seller);
            });
        });
        return savedSeller;
    }

    async updateSeller(userId: number, dto: UpdateSellerRequestDto): Promise<void> {
        await this.sellersRepository.update(userId, {
            firstname: dto.firstname,
            lastname: dto.lastname,
            phoneNumber: dto.phoneNumber,
            standNumber: dto.standNumber
        });
    }

    async remove(userId: number): Promise<MessageResultDto> {
        const seller: Seller | null = await this.sellersRepository.findOneBy({
            userId: userId,
        });
        if (seller == null){
            throw new NotFoundException();
        }
        await this.sellersRepository.delete(userId);
        return new MessageResultDto(`Verkäufer ${seller.firstname} ${seller.lastname} wurde gelöscht!`);
    }
}
