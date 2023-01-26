import CardTransaction from "../../entities/CardTransaction";
import { ICardTransaction, TransactionConverter } from "../../entities/utils";
import IStrategy from "./IStrategy";

export default class PersistenciaDeTransacciones implements IStrategy {
	private apiURL: string | null = null;

	public setApiURL(apiURL: string): void {
		this.apiURL = `${apiURL}/admin/transactions`;
	}

	public async createData(cardTransaction: CardTransaction): Promise<boolean | null> {
		try {
			throw new Error("Method not implemented.");
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async readData(): Promise<CardTransaction[] | null> {
		if (!this.apiURL) return null;

		try {
			let data: CardTransaction[] = await fetch(`${this.apiURL}`)
				.then((res) => res.json())
				.then((data) => data.map((item: ICardTransaction) => TransactionConverter.jsonToBook(item)));

			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	public async updateData(cardTransactionToSearch: CardTransaction, cardTransactionToUpdate: CardTransaction): Promise<boolean | null> {
		try {
			throw new Error("Method not implemented.");
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async deleteData(cardTransaction: CardTransaction): Promise<boolean | null> {
		try {
			throw new Error("Method not implemented.");
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
