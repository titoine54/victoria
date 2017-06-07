/** Represent a user */
import { UserSettings } from "app/classes/user-settings";

export class User {
    cip: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;

    settings: UserSettings;

    constructor(cip: string, firstName: string, lastName: string, email: string, userSettings?: UserSettings) {
        this.cip = cip;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${this.firstName} ${this.lastName}`;
        this.email = email;

        this.settings = userSettings || new UserSettings(this.email);
    }
}
