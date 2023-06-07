import config from "../config";

export default abstract class AbstractRepository {
	private static repository: AbstractRepository | null = null;

	public static getInstance(): AbstractRepository | null {
		return null;
	}

	protected static setRepository(repository: AbstractRepository) {
		this.repository = repository;
	}
	protected static getRepository(): AbstractRepository | null {
		return this.repository;
	}

	public abstract createData(data: Object): Promise<boolean | null>;
	public abstract readData(data?: Object): Promise<Object | [] | null>;
	public abstract updateData(dataToSearch: Object, dataToUpdate: Object): Promise<boolean | null>;
	public abstract deleteData(data: Object): Promise<boolean | null>;
}
