/** Represent a user */

export class User {
    cip: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;

    constructor(cip: string, firstName: string, lastName: string, email: string) {
        this.cip = cip;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${this.firstName} ${this.lastName}`;
        this.email = email;
    }
}
