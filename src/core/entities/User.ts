export default abstract class User {
    private user: string | undefined = undefined;
    private name: string | undefined = undefined;
    private email: string | undefined = undefined;
    private mobile: string | undefined = undefined;
    private password: string | undefined = undefined;

    constructor(user?: string, name?: string, email?: string, mobile?: string, password?: string) {
        this.user = user;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
    }

    public getUser(): string | undefined {
        return this.user;
    }
    public setUser(value: string) {
        this.user = value;
    }

    public getName(): string | undefined {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }

    public getEmail(): string | undefined {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }

    public getMobile(): string | undefined {
        return this.mobile;
    }
    public setMobile(value: string) {
        this.mobile = value;
    }

    public getPassword(): string | undefined {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }
}