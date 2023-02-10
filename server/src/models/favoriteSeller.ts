import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FavoriteSeller {

    @PrimaryGeneratedColumn()
    favId: number;

    @Column()
    userId: number;

    @Column()
    sellerId: number;

    constructor(userId: number, sellerId: number, favId: number) {
        this.userId = userId;
        this.sellerId = sellerId;
        this.favId = favId
    }
}
