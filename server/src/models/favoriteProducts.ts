import {Column, Entity} from "typeorm";

@Entity()
export class FavoriteProducts {
    @Column()
    userId: number;

    @Column()
    productId: number;

    constructor(userId: number, productId: number) {
        this.userId = userId;
        this.productId = productId;
    }
}