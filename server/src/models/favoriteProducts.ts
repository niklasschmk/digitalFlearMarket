import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FavoriteProducts {

    @PrimaryGeneratedColumn()
    favId: number;

    @Column()
    userId: number;

    @Column()
    productId: number;

    constructor(userId: number, productId: number, favId: number) {
        this.userId = userId;
        this.productId = productId;
        this.favId = favId
    }
}
