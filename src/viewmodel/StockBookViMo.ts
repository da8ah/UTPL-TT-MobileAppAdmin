import StockBook from "../core/entities/StockBook";
import { Cloner } from "../core/entities/utils";
import booksViMo from "./BooksViMo";

export type StockBookObserver = (book: StockBook, isEditingActive: boolean) => void;
class StockBookViMo {
	private observer: StockBookObserver | null = null;
	private stockBook: StockBook = new StockBook();
	private stockBookDraft: StockBook = new StockBook();
	private isEditingActive: boolean = false;

	public attach(observer: StockBookObserver) {
		this.observer = observer;
	}

	public detach() {
		this.observer = null;
	}

	public notify() {
		return this.isEditingActive;
	}

	public getStockBookFromBooksList(index: number): StockBook {
		const stockBook = booksViMo.getBookByIndex(index);
		if (stockBook.getIsbn() !== undefined) this.stockBook = stockBook;
		return this.stockBook;
	}

	public turnOnEditor() {
		this.isEditingActive = true;
		this.stockBookDraft = Cloner.stockBook(this.stockBook);
		if (this.observer) this.observer(this.stockBookDraft, this.isEditingActive);
	}

	public deleteCurrentDraft() {
		this.isEditingActive = false;
		if (this.observer) this.observer(this.stockBook, this.isEditingActive);
	}

	public updateDraft(bookUpdated: StockBook) {
		this.stockBookDraft = bookUpdated;
		if (this.observer) this.observer(this.stockBookDraft, this.isEditingActive);
	}

	public async deleteDataFromServer() {
		// if (this.repository) retrievedBooks = await GestionDeLibros.(this.repository);
		// if (retrievedBooks) this.books = retrievedBooks;
	}
}

const stockBookViMo = new StockBookViMo();

export default stockBookViMo;
