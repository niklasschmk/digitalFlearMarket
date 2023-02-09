import {Column, Entity} from "typeorm";

@Entity()
export class FavoriteSeller {
    @Column()
    userId: number;

    @Column()
    sellerId: number;

    constructor(userId: number, sellerId: number) {
        this.userId = userId;
        this.sellerId = sellerId;
    }
}