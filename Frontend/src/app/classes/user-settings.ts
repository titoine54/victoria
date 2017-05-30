/** Represent a user */
export class UserSettings {
    enableNotifications: boolean;
    notificationsSmsNumber: string;
    notificationsEmail: string;

    constructor(email?: string) {
        this.enableNotifications = false;
        this.notificationsEmail = email;
    }
}
