import AbstractRepository from "./AbstractRepository";
import config from "../config";
import IStrategy from "./strategies/IStrategy";

export class ServerDataSource extends AbstractRepository {
	private apiURL: string | null = config.URL.REPOSITORY;

	// SINGLETON
	private constructor() {
		super();
	}

	public static getInstance(): ServerDataSource | null {
		const repository = AbstractRepository.getRepository();
		if (!repository) AbstractRepository.setRepository(new ServerDataSource() as ServerDataSource);
		return AbstractRepository.getRepository() as ServerDataSource;
	}

	// STRATEGY
	private strategy: IStrategy | null = null;

	public setStrategy(strategy: IStrategy): void {
		this.strategy = strategy;
		if (this.apiURL) this.strategy.setApiURL(this.apiURL);
	}

	public async createData(data: Object): Promise<boolean | null> {
		try {
			if (this.apiURL) return !this.strategy ? null : this.strategy.createData(data);
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async readData(data?: Object): Promise<Object | [] | null> {
		try {
			if (this.apiURL) return !this.strategy ? null : this.strategy.readData(data);
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async updateData(dataToSearch: Object, dataToUpdate: Object): Promise<boolean | null> {
		try {
			if (this.apiURL) return !this.strategy ? null : this.strategy.updateData(dataToSearch, dataToUpdate);
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async deleteData(data: Object): Promise<boolean | null> {
		try {
			if (this.apiURL) return !this.strategy ? null : this.strategy.deleteData(data);
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default ServerDataSource.getInstance();
