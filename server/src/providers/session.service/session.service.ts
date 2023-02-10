import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SessionStore} from "../../models/sessionStore";
import {Repository} from "typeorm";

@Injectable()
export class SessionService {
    constructor(@InjectRepository(SessionStore) private sessionRepo: Repository<SessionStore>) {
    }

    findSession(id: number) {
       return this.sessionRepo.findOneBy({
           sessionId: id,
       });
    }

    findAllSessions() {
        return this.sessionRepo.find();
    }

    saveSession(id: number, session: any) {
        const s: SessionStore = new SessionStore(id, session.userId, session.firstname,
            session.lastname, session.connected);
        this.sessionRepo.save(s);
    }
}
