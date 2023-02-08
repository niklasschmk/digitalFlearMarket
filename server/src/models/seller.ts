import {User} from "./user";
import {Column, Entity} from "typeorm";

@Entity()
export class Seller extends User{
    @Column()
    standNumber: number;

    constructor(firstname: string, lastname: string, phoneNumber: string, standNumber: number) {
        super(firstname, lastname, phoneNumber);
        this.standNumber = standNumber;
    }
}