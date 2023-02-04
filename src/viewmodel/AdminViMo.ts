import AbstractRepository from "../core/data/AbstractRepository";
import LocalSecureStorage from "../core/data/LocalSecureStorage";
import ServerDataSource from "../core/data/ServerDataSource";
import serverDataSource from "../core/data/ServerDataSource";
import Admin from "../core/entities/Admin";
import GestionDeAdmin from "../core/usecases/admin/GestionDeAdmin";

export type AdminObserver = (authState: boolean) => void;
class AdminViMo {
	private observer: AdminObserver | null = null;
	private repository: AbstractRepository | null = ServerDataSource;
	private admin: Admin = new Admin();
	private jwt: string | null = null;

	public getJWT() {
		return this.jwt;
	}

	public getAdmin(): Admin {
		return this.admin;
	}

	public attach(observer: AdminObserver) {
		this.observer = observer;
	}
	public detach() {
		this.observer = null;
	}

	public async login(adminToSearch?: Admin) {
		let credenciales;
		if (this.repository) credenciales = await GestionDeAdmin.iniciarSesion(adminToSearch || new Admin(), this.repository);
		if (credenciales?.token) this.jwt = credenciales.token;
		if (credenciales?.admin) this.admin = credenciales.admin;
	}

	public async logout() {
		const confirmation = await GestionDeAdmin.cerrarSesion();
		if (confirmation) {
			this.admin.setUser("");
			this.admin.setName("");
			this.admin.setEmail("");
			this.admin.setMobile("");
			this.admin.setPassword("");
			this.admin = new Admin();
		}
		if (this.observer) this.observer(false);
	}
}

const adminViMo = new AdminViMo();

export default adminViMo;
