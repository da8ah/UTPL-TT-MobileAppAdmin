import AbstractRepository from "../core/data/AbstractRepository";
import ServerDataSource from "../core/data/ServerDataSource";
import StockBook from "../core/entities/StockBook";
import GestionDeLibros from "../core/usecases/admin/GestionDeLibros";
import booksViMo from "./BooksViMo";

export type NewStockBookObserver = (stockBookDraft: StockBook, isEditingActive: boolean, pop: boolean) => void;
class NewStockBookViMo {
	private observer: NewStockBookObserver | null = null;
	private repository: AbstractRepository | null = ServerDataSource;
	private stockBookDraft: StockBook = new StockBook();
	private isEditingActive: boolean = true;

	// GETTER & SETTER
	public getStockBookDraft(): StockBook {
		return this.stockBookDraft;
	}

	// OBSERVER
	public attach(observer: NewStockBookObserver) {
		this.observer = observer;
	}

	public detach() {
		this.observer = null;
	}

	// LOGIC
	public turnOnEditor() {
		this.isEditingActive = true;
		if (this.observer) this.observer(this.stockBookDraft, this.isEditingActive, false);
	}

	public updateDraftDate(date: Date) {
		if (!date) date = new Date();
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
	public async saveDataToServer() {
		let confirmation = null;
		this.stockBookDraft.setImgRef("https://books.png");
		const date = new Date().toLocaleDateString().split("/");
		this.stockBookDraft.setCreatedDate(`${date[1]}/${date[0]}/${date[2]}`);
		if (this.repository) confirmation = await GestionDeLibros.crearLibro(this.stockBookDraft, this.repository);
		if (this.observer && confirmation) this.observer(this.stockBookDraft, this.isEditingActive, true);
		if (confirmation) await booksViMo.updateBooks();
		return confirmation;
	}
}

const newStockBookViMo = new NewStockBookViMo();

export default newStockBookViMo;
