import {User} from "./user";
import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {Offerer} from "./offerer";


@Entity()
export class Seller extends User{
    @Column()
    standNumber: number;

    @ManyToMany(type => Offerer, offerer => offerer.sellers)
    offerers: Offerer[];

    constructor(username: string, password: string, firstname: string, lastname: string, phoneNumber: string, standNumber: number) {
        super(username, password, firstname, lastname, phoneNumber);
        this.standNumber = standNumber;
    }
}
