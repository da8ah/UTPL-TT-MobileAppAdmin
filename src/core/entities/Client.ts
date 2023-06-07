import User from "./User";
import BillingInfo from "./BillingInfo";
import Card from "./Card";
import Transaction from "./Transaction";

export default class Client extends User {
    private billingInfo: BillingInfo | undefined = undefined;
    private cards: Card[] | undefined = undefined;
    private transactions: Transaction[] | undefined = undefined;

    constructor(user?: string, name?: string, email?: string, mobile?: string, password?: string) {
        super(user, name, email, mobile, password);
    }

    public getBillingInfo(): BillingInfo | undefined {
        return this.billingInfo;
    }
    public setBillingInfo(value: BillingInfo) {
        this.billingInfo = value;
    }

    public getCards(): Card[] | undefined {
        return this.cards;
    }
    public setCards(value: Card[]) {
        this.cards = value;
    }

    public getTransactions(): Transaction[] | undefined {
        return this.transactions;
    }
    public setTransactions(value: Transaction[]) {
        this.transactions = value;
    }
    
}