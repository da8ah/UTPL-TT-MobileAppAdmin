import AbstractRepository from "../data/AbstractRepository";
import { ServerDataSource } from "../data/ServerDataSource";
import PersistenciaDeLibros from "../data/strategies/PersistenciaDeLibros";
import StockBook from "../entities/StockBook";

export default class GestionDeInicio {
	public static async listarCatalogoDeLibros(repository: AbstractRepository): Promise<StockBook[] | null> {
		const repo = repository as ServerDataSource;
		repo.setStrategy(new PersistenciaDeLibros());
		const data = <StockBook[]>await repo.readData();
		if (!data) return null;
		return data;
	}
	// public async buscarLibro(searchString: String, iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
	// 	return iPersistenciaLibro.filtrarLibros(searchString);
	// }
}
