export class User{
    userId?: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;

    constructor(firstname: string, lastname: string, phoneNumber: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
    }
}