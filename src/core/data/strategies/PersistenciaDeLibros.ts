import adminViMo from "../../../viewmodel/AdminViMo";
import StockBook from "../../entities/StockBook";
import { BookConverter, IStockBook } from "../../entities/utils";
import IStrategy from "./IStrategy";

export default class PersistenciaDeLibros implements IStrategy {
	private apiURL: string | null = null;

	public setApiURL(apiURL: string): void {
		this.apiURL = `${apiURL}/books`;
	}

	public async createData(stockBook: StockBook): Promise<boolean | null> {
		if (!this.apiURL) return null;

		try {
			const httpContent = {
				method: "POST",
				headers: {
					Authorization: adminViMo.getJWT() || "",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(stockBook),
			};
			return await fetch(this.apiURL, httpContent).then((res) => res.ok);
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	public async readData(): Promise<StockBook[] | null> {
		if (!this.apiURL) return null;

		try {
			const httpContent = {
				method: "GET",
				headers: {
					Authorization: adminViMo.getJWT() || "",
				},
			};
			let data: StockBook[] = await fetch(this.apiURL, httpContent)
				.then((res) => res.json())
				.then((data) => data.map((item: IStockBook) => BookConverter.jsonToBook(item)));

			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
	public async updateData(bookToSearch: StockBook, bookToUpdate: StockBook): Promise<boolean | null> {
		if (!this.apiURL) return null;

		try {
			const httpContent = {
				method: "PUT",
				headers: {
					Authorization: adminViMo.getJWT() || "",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bookToUpdate),
			};
			return await fetch(`${this.apiURL}/${bookToSearch.getIsbn()}`, httpContent).then((res) => res.ok);
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	public async deleteData(stockBook: StockBook): Promise<boolean | null> {
		if (!this.apiURL) return null;

		try {
			const httpContent = {
				method: "DELETE",
				headers: {
					Authorization: adminViMo.getJWT() || "",
				},
			};
			return await fetch(`${this.apiURL}/${stockBook.getIsbn()}`, httpContent).then((res) => res.ok);
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
