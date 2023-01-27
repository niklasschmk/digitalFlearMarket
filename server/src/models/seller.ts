import {User} from "@/models/user";

export class Seller extends User{
    standNumber: number;

    constructor(firstname: string, lastname: string, standNumber: number, phoneNumber: string) {
        super(firstname, lastname, phoneNumber);
        this.standNumber = standNumber;
    }
}