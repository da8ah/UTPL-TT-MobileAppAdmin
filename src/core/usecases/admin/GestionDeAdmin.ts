import config from "../../config";
import AbstractRepository from "../../data/AbstractRepository";
import LocalSecureStorage from "../../data/LocalSecureStorage";
import { ServerDataSource } from "../../data/ServerDataSource";
import PersistenciaDeAdmin from "../../data/strategies/PersistenciaDeAdmin";
import Admin from "../../entities/Admin";

export default class GestionDeAdmin {
	public async crearCuenta(admin: Admin, repository: AbstractRepository): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}

	public static async iniciarSesion(admin: Admin, repository: AbstractRepository): Promise<Admin | null> {
		try {
			const secureStorage = LocalSecureStorage;
			const token = (await secureStorage?.readData({ key: config.LSS.AUTH_KEY })) || null;
			const data = { token, admin };
			const repo = repository as ServerDataSource;
			repo.setStrategy(new PersistenciaDeAdmin());
			const resultado = <{ token: string | null; admin: Admin | null }>await repo.readData(data);
			if (!resultado.token && resultado.admin) return resultado.admin;
			if (resultado.token) {
				const secureStorage = LocalSecureStorage;
				const tokenSavedConfirmation = await secureStorage?.createData({ key: config.LSS.AUTH_KEY, value: resultado.token });
				console.log(tokenSavedConfirmation);
			}
			return resultado.admin ? resultado.admin : null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async actualizarCuenta(adminToSearch: Admin, adminToUpdate: Admin, repository: AbstractRepository): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}

	public async eliminarCuenta(admin: Admin, repository: AbstractRepository): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}
}
