import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class SessionStore{
    @PrimaryColumn()
    sessionId: any;

    @Column()
    userId: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    connected: boolean;

    constructor(sessionId: any, userId: number, firstname: string,
                lastname: string, connected: boolean) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.connected = connected;
    }

}