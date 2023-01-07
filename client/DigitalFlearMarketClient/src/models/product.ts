export class Product{
    productId?: number;
    name: string;
    price: number;
    negotiable: boolean;
    description: string;
    pictures: string[];

    constructor(name: string, price: number, negotiable: boolean, description: string, pictures: string[]) {
        this.name = name;
        this.price = price;
        this.negotiable = negotiable;
        this.description = description;
        this.pictures = pictures;
    }
}