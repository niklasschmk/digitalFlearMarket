import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Chatmessage} from "../../models/chatmessage";
import {Repository} from "typeorm";

@Injectable()
export class ChatmessageService {
    constructor(@InjectRepository(Chatmessage) private chatmessageRepo: Repository<Chatmessage>){
    }

    saveMessage(content: string, from: number, to: number){
        const message: Chatmessage = new Chatmessage(content, from, to);
        this.chatmessageRepo.save(message);
    }

    findMessagesForUser(userId: number): Promise<Chatmessage[]>{
        let messagesFrom: Chatmessage[] = [];
        let messagesTo: Chatmessage[] = [];

        return new Promise<Chatmessage[]>(async (resolve, reject) => {
            messagesFrom = await this.chatmessageRepo.findBy({
                from: userId,
            });
            messagesTo = await this.chatmessageRepo.findBy({
                to: userId,
            });
            if (!messagesFrom || !messagesTo){
                reject('This user has no massages!');
            } else {
                if (messagesTo){
                    for (const m of messagesTo){
                        messagesFrom.push(m);
                    }
                }
                resolve(messagesFrom);
            }
        })
    }
}
