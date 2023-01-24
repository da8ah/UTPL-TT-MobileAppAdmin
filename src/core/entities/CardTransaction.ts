import Cart from "./Cart";
import Transaction from "./Transaction";

export default class CardTransaction extends Transaction {

    constructor(
        id?: string,
        date?: string,
        payment?: number,
        change?: number,
        cart?: Cart
    ) {
        super(id, date, payment, change);
        if (cart) this.setCart(cart);
    }

}