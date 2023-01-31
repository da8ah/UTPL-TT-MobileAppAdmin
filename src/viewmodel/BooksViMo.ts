import AbstractRepository from "../core/data/AbstractRepository";
import ServerDataSource from "../core/data/ServerDataSource";
import StockBook from "../core/entities/StockBook";
import GestionDeInicio from "../core/usecases/GestionDeInicio";

export type BooksObserver = (books: StockBook[]) => void;

export class BooksViMo {
	private observer: BooksObserver | null = null;
	private repository: AbstractRepository | null = ServerDataSource;
	private books: StockBook[] = [];

	public attach(observer: BooksObserver) {
		this.observer = observer;
	}

	public detach() {
		this.observer = null;
	}

	public async updateBooks() {
		await this.getDataFromServer();
		if (this.observer && this.books) this.observer(this.books);
	}

	public async getDataFromServer() {
		let retrievedBooks = null;
		if (this.repository) retrievedBooks = await GestionDeInicio.listarCatalogoDeLibros(this.repository);
		if (retrievedBooks) this.books = retrievedBooks;
	}

	public getBooksStored(): StockBook[] {
		return this.books;
	}

	public getBookByIndex(index: number): StockBook {
		return this.books[index] || new StockBook();
	}
	public removeBookByIndexFromLocalArray(index: number) {
		try {
			this.books.splice(index, 1);
			if (this.observer && this.books) this.observer(this.books);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

const booksViMo = new BooksViMo();

export default booksViMo;
