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

	public static async iniciarSesion(admin: Admin, repository: AbstractRepository): Promise<{ token: string | null; admin: Admin | null } | null> {
		try {
			const secureStorage = LocalSecureStorage;
			let token = null;
			if (!admin || (admin?.getUser() === undefined && admin?.getPassword() === undefined)) {
				token = await secureStorage?.readData({ key: config.LSS.AUTH_KEY });
			}
			const data = { token, admin };
			const repo = repository as ServerDataSource;
			repo.setStrategy(new PersistenciaDeAdmin());
			const resultado = <{ token: string | null; admin: Admin | null }>await repo.readData(data);
			if (!resultado.token && resultado.admin) return { token: token || null, admin: resultado.admin };
			if (resultado.token) await secureStorage?.createData({ key: config.LSS.AUTH_KEY, value: resultado.token });
			return resultado.token && resultado.admin ? { token: resultado.token, admin: resultado.admin } : null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public static async cerrarSesion(): Promise<boolean | null> {
		try {
			const secureStorage = LocalSecureStorage;
			const confirmation = await secureStorage?.deleteData({ key: config.LSS.AUTH_KEY });
			return confirmation ? confirmation : false;
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
