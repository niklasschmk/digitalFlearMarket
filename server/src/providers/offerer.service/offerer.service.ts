import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Offerer} from "../../models/offerer";
import {Repository} from "typeorm";
import {UpdateSellerRequestDto} from "../../dtos/sellers/UpdateSellerRequestDto";
import {MessageResultDto} from "../../dtos/MessageResultDto";
import {Seller} from "../../models/seller";
import {CreateOffererRequestDto} from "../../dtos/offerers/CreateOffererRequestDto";
import {UpdateOffererRequestDto} from "../../dtos/offerers/UpdateOffererRequestDto";
import {CreateFavoriteProductReqDto} from "../../dtos/favoriteProducts/CreateFavoriteProductReqDto";
import {Product} from "../../models/product";
import {CreateFavoriteSellerReqDto} from "../../dtos/favoriteSeller/CreateFavoriteSellerReqDto";

@Injectable()
export class OffererService {
    constructor(@InjectRepository(Offerer) private offererRepo: Repository<Offerer>) {
    }

    getAllOfferers(): Promise<Offerer[]> {
        return this.offererRepo.find();
    }

    getOffererById(userId: number): Promise<Offerer> {
        return this.offererRepo.findOneBy({
            userId: userId,
        });
    }

    async createNewOfferer(dto: CreateOffererRequestDto): Promise<Offerer> {
        const offerer: Offerer = new Offerer(dto.firstname, dto.lastname, dto.phoneNumber);
        return this.offererRepo.save(offerer);
    }

    async updateOfferer(userId: number, dto: UpdateOffererRequestDto): Promise<void> {
        await this.offererRepo.update(userId, {
            firstname: dto.firstname,
            lastname: dto.lastname,
            phoneNumber: dto.phoneNumber,
        });
    }

    async favorProduct(dto: CreateFavoriteProductReqDto): Promise<void> {
        const offerer: Offerer | null = await this.offererRepo.findOneBy({
            userId: dto.userId,
        });
        const favProducts: Product[] = offerer.products;
        favProducts.push(dto.product);
        this.offererRepo.update(dto.userId, {
            products: favProducts
        })
    }

    async favorSeller(dto: CreateFavoriteSellerReqDto): Promise<void> {
        const offerer: Offerer | null = await this.offererRepo.findOneBy({
            userId: dto.userId,
        });
        const favSellers: Seller[] = offerer.sellers;
        favSellers.push(dto.seller);
        this.offererRepo.update(dto.userId, {
            sellers: favSellers
        });
    }

    async remove(userId: number): Promise<MessageResultDto> {
        const offerer: Offerer | null = await this.offererRepo.findOneBy({
            userId: userId,
        });
        if (offerer == null){
            throw new NotFoundException();
        }
        await this.offererRepo.delete(userId);
        return new MessageResultDto(`Verkäufer ${offerer.firstname} ${offerer.lastname} wurde gelöscht!`);
    }
}
