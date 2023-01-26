import AbstractRepository from "../core/data/AbstractRepository";
import serverDataSource from "../core/data/ServerDataSource";
import CardTransaction from "../core/entities/CardTransaction";
import GestionDeTransacciones from "../core/usecases/admin/GestionDeTransacciones";
import GestionDeInicio from "../core/usecases/GestionDeInicio";

export type TransactionsObserver = (transactions: CardTransaction[]) => void;

class TransactionsViMo {
	private observer: TransactionsObserver | null = null;
	private repository: AbstractRepository | null = serverDataSource;
	private transactions: CardTransaction[] = [];

	public attach(observer: TransactionsObserver) {
		this.observer = observer;
	}

	public detach() {
		this.observer = null;
	}

	public async updateTransactions() {
		await this.getDataFromServer();
		if (this.observer && this.transactions) this.observer(this.transactions);
	}

	public async getDataFromServer() {
		let retrievedTransactions = null;
		if (this.repository) retrievedTransactions = await GestionDeTransacciones.listarTodasLasTransacciones(this.repository);
		if (retrievedTransactions) this.transactions = retrievedTransactions;
	}

	public getTransactionsStored(): CardTransaction[] {
		return this.transactions;
	}
}

const transactionsViMo = new TransactionsViMo();

export default transactionsViMo;
