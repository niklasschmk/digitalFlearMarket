import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {User} from "./user";
import {Product} from "./product";
import {Seller} from "./seller";


@Entity()
export class Offerer extends User{
    @ManyToMany((type) => Product, {cascade: true,})
    @JoinTable({
        name: "offerers_favorite_products",
        joinColumn: {name: "userId", referencedColumnName: "userId"},
        inverseJoinColumn: {name: "productId"}
    })
    products: Product[];

    @ManyToMany((type) => Seller, {cascade: true,})
    @JoinTable({
        name: "offerers_favorite_sellers",
        joinColumn: {name: "userId", referencedColumnName: "userId"},
        inverseJoinColumn: {name: "sellerId", referencedColumnName: "userId"}
    })
    sellers: Seller[];


    constructor(username: string, hashedPassword: string, firstname: string, lastname: string, phoneNumber: string) {
        super(username, hashedPassword, firstname, lastname, phoneNumber);
        //this.favoriteProducts = [];
    }
}
