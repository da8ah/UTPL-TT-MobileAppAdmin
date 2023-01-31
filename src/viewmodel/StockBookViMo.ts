import AbstractRepository from "../core/data/AbstractRepository";
import ServerDataSource from "../core/data/ServerDataSource";
import StockBook from "../core/entities/StockBook";
import { Cloner } from "../core/entities/utils";
import GestionDeLibros from "../core/usecases/admin/GestionDeLibros";
import booksViMo from "./BooksViMo";

export type StockBookObserver = (stockBook: StockBook, isEditingActive: boolean, pop: boolean) => void;
class StockBookViMo {
	private observer: StockBookObserver | null = null;
	private repository: AbstractRepository | null = ServerDataSource;
	private stockBook: StockBook = new StockBook();
	private stockBookDraft: StockBook = new StockBook();
	private isEditingActive: boolean = false;
	private bookIndex: number | null = null;

	// GETTER & SETTER
	public getStockBook(): StockBook {
		return this.stockBook;
	}

	// OBSERVER
	public attach(observer: StockBookObserver) {
		this.observer = observer;
	}

	public detach() {
		this.observer = null;
	}

	// LOGIC
	public getStockBookFromBooksList(index: number): StockBook {
		this.bookIndex = index;
		const stockBook = booksViMo.getBookByIndex(this.bookIndex);
		if (stockBook.getIsbn() !== undefined) this.stockBook = stockBook;
		return this.stockBook;
	}

	public turnOnEditor() {
		this.isEditingActive = true;
		this.stockBookDraft = Cloner.stockBook(this.stockBook);
		if (this.observer) this.observer(this.stockBookDraft, this.isEditingActive, false);
	}

	public deleteCurrentDraft() {
		this.isEditingActive = false;
		if (this.observer) this.observer(this.stockBook, this.isEditingActive, false);
	}

	public updateDraftDate(date: Date) {
		this.stockBookDraft.setReleaseDate(
			Intl.DateTimeFormat("es-ec", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			}).format(date),
		);
	}

	public updateDraft(bookUpdated: StockBook) {
		this.stockBookDraft = bookUpdated;
		if (this.observer) this.observer(this.stockBookDraft, this.isEditingActive, false);
	}

	// PERSISTANCE
	public async deleteDataFromServer(): Promise<boolean | null> {
		let confirmation = null;
		if (this.repository) confirmation = await GestionDeLibros.eliminarLibro(this.stockBook, this.repository);
		if (this.observer) this.observer(this.stockBookDraft, this.isEditingActive, true);
		if (confirmation) await booksViMo.updateBooks();
		return confirmation;
	}

	public async saveDataToServer() {
		let confirmation = null;
		if (this.repository) confirmation = await GestionDeLibros.actualizarLibro(this.stockBook, this.stockBookDraft, this.repository);
		if (this.observer) this.observer(this.stockBookDraft, this.isEditingActive, true);
		if (confirmation) await booksViMo.updateBooks();
		return confirmation;
	}
}

const stockBookViMo = new StockBookViMo();

export default stockBookViMo;
