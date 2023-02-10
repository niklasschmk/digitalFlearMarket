import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Offerer} from "./offerer";

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

    @Column()
    title: string;

    @ManyToMany(type => Offerer, offerer => offerer.products)
    offerers: Offerer[];

    //@OneToMany(type => Picture, picture => picture.productId)
    //pictures: Picture[];

    constructor(userId: number, name: string, price: number, negotiable: boolean, description: string, title: string) {
        this.userId = userId;
        this.name = name;
        this.price = price;
        this.negotiable = negotiable;
        this.description = description;
        this.title = title
    }
}
