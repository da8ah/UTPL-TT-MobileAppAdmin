import Cart from "./Cart";

export default abstract class Transaction {
    private id: string | undefined = undefined;
    private date: string | undefined = undefined;
    private payment: number | undefined = undefined;
    private change: number | undefined = undefined;
    private cart: Cart | undefined = undefined;

    constructor(id?: string, date?: string, payment?: number, change?: number) {
        this.id = id;
        this.date = date;
        this.payment = payment;
        this.change = change;
    }

    public getId(): string | undefined {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }

    public getDate(): string | undefined {
        return this.date;
    }
    public setDate(value: string) {
        this.date = value;
    }

    public getPayment(): number | undefined {
        return this.payment;
    }
    public setPayment(value: number) {
        this.payment = value;
    }

    public getChange(): number | undefined {
        return this.change;
    }
    public setChange(value: number) {
        this.change = value;
    }

    public getCart(): Cart | undefined {
        return this.cart;
    }
    public setCart(value: Cart) {
        this.cart = value;
    }
}