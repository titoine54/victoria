/** Represent a user */
export class UserSettings {
    enableEmailNotif: boolean;
    enableSmsNotif: boolean;
    smsNumber: string;
    notifEmail: string;

    constructor(email?: string, smsNumber?:string) {
        this.enableEmailNotif = false;
        this.enableSmsNotif = false;
        this.notifEmail = email;
        this.smsNumber = smsNumber;
    }
}
