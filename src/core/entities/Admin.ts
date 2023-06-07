import User from "./User";

export default class Admin extends User {
    constructor(user?: string, name?: string, email?: string, mobile?: string, password?: string) {
        super(user, name, email, mobile, password);
    }
}