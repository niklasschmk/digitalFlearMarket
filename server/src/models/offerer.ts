import {Column, Entity} from "typeorm";
import {User} from "./user";

@Entity()
export class Offerer extends User{
    //@Column()
    //favoriteProducts: number[];

    constructor(firstname: string, lastname: string, phoneNumber: string) {
        super(firstname, lastname, phoneNumber);
        //this.favoriteProducts = [];
    }
}
