import AbstractRepository from "../core/data/AbstractRepository";
import serverDataSource from "../core/data/ServerDataSource";
import StockBook from "../core/entities/StockBook";
import GestionDeInicio from "../core/usecases/GestionDeInicio";

export type BooksObserver = (books: StockBook[]) => void;

class BooksViMo {
	private observer: BooksObserver | null = null;
	private repository: AbstractRepository | null = serverDataSource;
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
}

const booksViMo = new BooksViMo();

export default booksViMo;
