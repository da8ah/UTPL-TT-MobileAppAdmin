import config from "../../config";
import Admin from "../../entities/Admin";
import { AdminConverter } from "../../entities/utils";
import IStrategy from "./IStrategy";

export default class PersistenciaDeAdmin implements IStrategy {
	private apiURL: string | null = null;

	public setApiURL(apiURL: string): void {
		this.apiURL = apiURL;
	}

	public createData(admin: Admin): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}

	public async readData(data: { token: string; admin: Admin }): Promise<{ token: string | null; admin: Admin | null } | null> {
		if (!this.apiURL) return null;

		try {
			let token = null;
			let admin = null;

			// Token already saved - Returns Admin
			if (data.token) {
				const httpContent = {
					method: "GET",
					headers: {
						Authorization: data.token,
					},
				};
				await fetch(`${this.apiURL}/login`, httpContent)
					.then((res) => res.json())
					.then((body) => (admin = AdminConverter.jsonToAdmin(body)));
				return { token: null, admin };
			}

			// Token not saved - Returns Token & Admin
			if (data?.admin?.getUser() !== undefined && data?.admin?.getPassword() !== undefined) {
				const httpContent = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ user: data.admin.getUser(), password: data.admin.getPassword() }),
				};
				await fetch(`${this.apiURL}/login`, httpContent)
					.then((res) => {
						token = res.headers.get("set-cookie")?.split(";")[0].split("=")[1];
						return res.json();
					})
					.then((body) => (admin = AdminConverter.jsonToAdmin(body)));
				return { token, admin };
			}

			// Otherwise returns both null
			return { token: null, admin: null };
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public updateData(adminToSearch: Admin, adminToUpdate: Admin): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}
	public deleteData(admin: Admin): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}
}
