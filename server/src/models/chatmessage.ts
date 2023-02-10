import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Chatmessage{
    @PrimaryGeneratedColumn()
    chatMessageId: number;

    @Column()
    content: string;

    @Column()
    from: number;

    @Column()
    to: number;

    constructor(content: string, from: number, to: number) {
        this.content = content;
        this.from = from;
        this.to = to;
    }
}