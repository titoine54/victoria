/** Represent a user */
import { UserSettings } from "app/classes/user-settings";

export class User {
    cip: string;
    firstName: string;
    lastName: string;
    email: string;

    loginToken: string;
    settings: UserSettings;

    constructor(cip: string, firstName: string, lastName: string, email: string, loginToken?: string, userSettings?: UserSettings) {
        this.cip = cip;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;

        this.loginToken = loginToken;
        this.settings = userSettings || new UserSettings(this.email);
    }
}
