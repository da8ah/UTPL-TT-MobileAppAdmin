import AbstractRepository from "../../data/AbstractRepository";
import { ServerDataSource } from "../../data/ServerDataSource";
import PersistenciaDeTransacciones from "../../data/strategies/PersistenciaDeTransacciones";
import CardTransaction from "../../entities/CardTransaction";

export default class GestionDeTransacciones {
	public static async listarTodasLasTransacciones(repository: AbstractRepository): Promise<CardTransaction[] | null> {
		const repo = repository as ServerDataSource;
		repo.setStrategy(new PersistenciaDeTransacciones());
		const data = <CardTransaction[]>await repo.readData();
		if (!data) return null;
		return data;
	}
}
