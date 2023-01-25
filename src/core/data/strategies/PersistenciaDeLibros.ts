import StockBook from "../../entities/StockBook";
import { BookConverter, IStockBook } from "../../entities/utils";
import IStrategy from "./IStrategy";

export default class PersistenciaDeLibros implements IStrategy {
	private apiURL: string | null = null;
	private apiAdminBooks: string = `${this.apiURL}/admin/books`;

	public setApiURL(apiURL: string): void {
		this.apiURL = apiURL;
	}

	public async createData(stockBook: StockBook): Promise<boolean | null> {
		if (!this.apiURL) return null;

		try {
			const bodyContent = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(stockBook),
			};
			return await fetch(this.apiAdminBooks, bodyContent).then((res) => res.ok);
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	public async readData(): Promise<StockBook[] | null> {
		if (!this.apiURL) return null;

		try {
			let data: StockBook[] = await fetch(`${this.apiURL}/books`)
				.then((res) => res.json())
				.then((data) => data.map((item: IStockBook) => BookConverter.jsonToBook(item)));

			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
	public async updateData(bookToSearch: StockBook, bookToUpdate: StockBook): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}
	public async deleteData(stockBook: StockBook): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}
}
