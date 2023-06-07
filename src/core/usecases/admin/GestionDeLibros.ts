import AbstractRepository from "../../data/AbstractRepository";
import { ServerDataSource } from "../../data/ServerDataSource";
import PersistenciaDeLibros from "../../data/strategies/PersistenciaDeLibros";
import StockBook from "../../entities/StockBook";

export default class GestionDeLibros {
	public static async crearLibro(stockBook: StockBook, repository: AbstractRepository): Promise<boolean | null> {
		const repo = repository as ServerDataSource;
		repo.setStrategy(new PersistenciaDeLibros());
		const confirmation = await repo.createData(stockBook);
		if (confirmation === null) return null;
		return confirmation;
	}

	public static async listarCatalogoDeLibrosEnStock(repository: AbstractRepository): Promise<StockBook[] | null> {
		const repo = repository as ServerDataSource;
		repo.setStrategy(new PersistenciaDeLibros());
		const data = <StockBook[]>await repo.readData();
		if (!data) return null;
		return data;
	}

	// Two StockBooks required in case of ISBN update
	public static async actualizarLibro(bookToSearch: StockBook, bookToUpdate: StockBook, repository: AbstractRepository): Promise<boolean | null> {
		const repo = repository as ServerDataSource;
		repo.setStrategy(new PersistenciaDeLibros());
		const confirmation = await repo.updateData(bookToSearch, bookToUpdate);
		if (confirmation === null) return null;
		return confirmation;
	}

	public static async eliminarLibro(stockBook: StockBook, repository: AbstractRepository): Promise<boolean | null> {
		const repo = repository as ServerDataSource;
		repo.setStrategy(new PersistenciaDeLibros());
		const confirmation = await repo.deleteData(stockBook);
		if (confirmation === null) return null;
		return confirmation;
	}
}
