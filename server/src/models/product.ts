import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    productId?: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    negotiable: boolean;

    @Column()
    description: string;

    //@OneToMany(type => Picture, picture => picture.productId)
    //pictures: Picture[];

    constructor(userId: number, name: string, price: number, negotiable: boolean, description: string) {
        this.userId = userId;
        this.name = name;
        this.price = price;
        this.negotiable = negotiable;
        this.description = description;
    }
}