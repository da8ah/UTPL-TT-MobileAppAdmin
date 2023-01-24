import ToBuyBook from "./ToBuyBook";

export default class Cart {
    private discountCalc: number | undefined = undefined;
    private ivaCalc: number | undefined = undefined;
    private subtotal: number | undefined = undefined;
    private totalPrice: number | undefined = undefined;
    private toBuyBooks: ToBuyBook[] | undefined = undefined;

    constructor(
        discountCalc?: number,
        ivaCalc?: number,
        subtotal?: number,
        totalPrice?: number,
        toBuyBooks?: ToBuyBook[]
    ) {
        this.discountCalc = discountCalc;
        this.ivaCalc = ivaCalc;
        this.subtotal = subtotal;
        this.totalPrice = totalPrice;
        this.toBuyBooks = toBuyBooks;
        this.calculate();
    }

    public calculate() {
        const books = this.getToBuyBooks();
        if (books != undefined) {
            let discountAcc = 0;
            let ivaAcc = 0;
            let subtotal = 0;
            let totalPrice = 0;
            for (const book of books) {
                // Calc with all quantities
                const cant = book.getCant();
                if (cant != undefined) {
                    const discount = book.getDiscountedAmount();
                    if (discount != undefined) discountAcc = discountAcc + discount * cant;
                    const iva = book.getIvaAmount();
                    if (iva != undefined) ivaAcc = ivaAcc + iva * cant;

                    const grossPricePerUnit = book.getGrossPricePerUnit();
                    if (grossPricePerUnit != undefined) subtotal = subtotal + grossPricePerUnit * cant;
                    const priceCalcPerUnit = book.getPriceCalcPerUnit();
                    if (priceCalcPerUnit != undefined) totalPrice = totalPrice + priceCalcPerUnit * cant;
                }
            }

            this.discountCalc = discountAcc;
            this.ivaCalc = ivaAcc;
            this.subtotal = subtotal;
            this.totalPrice = totalPrice;
        }
    }

    public getDiscountCalc(): number | undefined {
        return this.discountCalc;
    }

    public getIvaCalc(): number | undefined {
        return this.ivaCalc;
    }

    public getSubtotal(): number | undefined {
        return this.subtotal;
    }

    public getTotalPrice(): number | undefined {
        return this.totalPrice;
    }

    public getToBuyBooks(): ToBuyBook[] | undefined {
        return this.toBuyBooks;
    }
}