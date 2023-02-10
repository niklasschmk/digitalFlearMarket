import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    hashedPassword: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phoneNumber: string;


/*
    @OneToMany(type => Product, product => product.userId)
    product: Product[];
 */

    constructor(username: string, hashedPassword: string, firstname: string, lastname: string, phoneNumber: string) {
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;

        //this.product = [];
    }
}
