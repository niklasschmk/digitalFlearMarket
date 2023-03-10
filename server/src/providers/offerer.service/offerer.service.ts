import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
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
import {UpdateFavoriteProductReqDto} from "../../dtos/favoriteProducts/UpdateFavoriteProductReqDto";
import {UpdateFavoriteSellerReqDto} from "../../dtos/favoriteSeller/UpdateFavoriteSellerReqDto";
import * as bcrypt from "bcrypt";

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

    getOffererByUsername(username: string): Promise<Offerer> {
        return this.offererRepo.findOneBy({
            username: username,
        });
    }


    async createNewOfferer(dto: CreateOffererRequestDto): Promise<Offerer> {
        const saltRounds: number = 10;
        const repo: Repository<Offerer> = this.offererRepo;
        let offerer: Promise<Offerer>;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(dto.hashedPassword, salt, function (err, hash) {
                console.log(hash);
                offerer = repo.save(new Offerer(dto.username, hash, dto.firstname, dto.lastname, dto.phoneNumber));
            });
        });
        return offerer;
    }

    async createNewOfferer2(username: string, hashedPassword: string, firstname: string, lastname: string, phoneNumber: string): Promise<Offerer> {
        const offerer: Offerer = new Offerer(username, hashedPassword, firstname, lastname, phoneNumber);
        return this.offererRepo.save(offerer);
    }

    async updateOfferer(userId: number, dto: UpdateOffererRequestDto): Promise<void> {
        await this.offererRepo.update(userId, {
            username: dto.username,
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
        });
    }

    async noLongerFavorProduct(userId: number, dto: UpdateFavoriteProductReqDto): Promise<void> {
        const offerer: Offerer | null = await this.offererRepo.findOneBy({
            userId: userId,
        });
        const favProducts: Product[] = offerer.products;
        favProducts.splice(favProducts.indexOf(dto.product),1);
        this.offererRepo.update(dto.userId, {
            products: favProducts
        });
    }

    async noLongerFavorSeller(userId: number, dto: UpdateFavoriteSellerReqDto): Promise<void> {
        const offerer: Offerer | null = await this.offererRepo.findOneBy({
            userId: userId,
        });
        const favSeller: Seller[] = offerer.sellers;
        favSeller.splice(favSeller.indexOf(dto.seller),1);
        this.offererRepo.update(dto.userId, {
            sellers: favSeller
        });
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
        return new MessageResultDto(`Verk??ufer ${offerer.firstname} ${offerer.lastname} wurde gel??scht!`);
    }
}
