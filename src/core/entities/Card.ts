export default class Card {
    private ownerName: string | undefined = undefined;
    private cardNumber: string | undefined = undefined;
    private code: string | undefined = undefined;
    private expiryDate: string | undefined = undefined;

    constructor(ownerName?: string, cardNumber?: string, code?: string, expiryDate?: string) {
        this.ownerName = ownerName;
        this.cardNumber = cardNumber;
        this.code = code;
        this.expiryDate = expiryDate;
    }

    public getOwnerName(): string | undefined {
        return this.ownerName;
    }

    public setOwnerName(ownerName: string): void {
        this.ownerName = ownerName;
    }

    public getCardNumber(): string | undefined {
        return this.cardNumber;
    }

    public setCardNumber(cardNumber: string): void {
        this.cardNumber = cardNumber;
    }

    public getCode(): string | undefined {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getExpiryDate(): string | undefined {
        return this.expiryDate;
    }

    public setExpiryDate(expiryDate: string): void {
        this.expiryDate = expiryDate;
    }
}