import * as SecureStore from "expo-secure-store";
import AbstractRepository from "./AbstractRepository";

export class LocalSecureStorage extends AbstractRepository {
	private jwt = null;

	// SINGLETON
	private constructor() {
		super();
	}

	public static getInstance(): LocalSecureStorage | null {
		const repository = AbstractRepository.getRepository();
		if (!repository) AbstractRepository.setRepository(new LocalSecureStorage() as LocalSecureStorage);
		return AbstractRepository.getRepository() as LocalSecureStorage;
	}

	public async createData(data: { key: string; value: string }): Promise<boolean | null> {
		if (!(await SecureStore.isAvailableAsync())) return null;

		try {
			if (!(data.key && data.value)) return false;
			await SecureStore.setItemAsync(data.key, data.value);
			return true;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async readData(data: { key: string }): Promise<string | null> {
		if (!(await SecureStore.isAvailableAsync())) return null;

		try {
			const item = await SecureStore.getItemAsync(data.key);
			console.log(item);

			return item;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async updateData(dataToSearch: { key: string }, dataToUpdate: { value: string }): Promise<boolean | null> {
		if (!(await SecureStore.isAvailableAsync())) return null;

		try {
			const item = await SecureStore.getItemAsync(dataToSearch.key);
			if (item) await SecureStore.deleteItemAsync(dataToSearch.key);
			await SecureStore.setItemAsync(dataToSearch.key, dataToUpdate.value).then((res) => console.log(res));
			return true;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async deleteData(data: { key: string }): Promise<boolean | null> {
		if (!(await SecureStore.isAvailableAsync())) return null;

		try {
			await SecureStore.deleteItemAsync(data.key);
			return true;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default LocalSecureStorage.getInstance();
