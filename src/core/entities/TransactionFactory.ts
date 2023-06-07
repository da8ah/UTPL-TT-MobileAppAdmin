import Transaction from "./Transaction";
import CardTransaction from "./CardTransaction";

export default class TransactionFactory {

    public createTransaction(transactionType: string): Transaction | null {
        switch (transactionType.toLowerCase()) {
            case "":
                return null;
            case "card":
                return new CardTransaction();
            default:
                return null;
        }
    }

}