import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Seller} from "../../models/seller";
import {CreateSellerRequestDto} from "../../dtos/sellers/CreateSellerRequestDto";
import {UpdateSellerRequestDto} from "../../dtos/sellers/UpdateSellerRequestDto";
import {MessageResultDto} from "../../dtos/MessageResultDto";

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
        const seller: Seller = new Seller(dto.firstname, dto.lastname, dto.phoneNumber, dto.standNumber);
        return this.sellersRepository.save(seller);
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
