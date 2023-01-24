import { AdminConverter } from "../../../services/app/utils";
import Admin from "../../entities/Admin";
import IPersistenciaCuenta from "../../ports/persistencia/IPersistenciaCuenta";
import IGestionDeCuentas from "../IGestionDeAutenticacion";
import IGestionDeAutenticacion from "../IGestionDeAutenticacion";

export default class GestionDeAdmin implements IGestionDeAutenticacion, IGestionDeCuentas {

    public async crearCuenta(admin: Admin, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Admin> {
        const clientFound = await iPersistenciaCuenta.buscarCuenta(new Admin(admin.getUser()));
        if (clientFound.getUser()) return admin;
        return await iPersistenciaCuenta.guardarCuentaNueva(admin) as Admin;
    }

    public async iniciarSesion(admin: Admin, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Admin> {
        const adminFound = AdminConverter.adminToModel(await iPersistenciaCuenta.buscarCuenta(admin) as Admin);
        const password = admin.getPassword();
        if (password != undefined) {
            const auth = await adminFound.comparePassword(password);
            if (auth) return AdminConverter.modelToAdmin(adminFound);
        }
        return new Admin();
    }

    public async actualizarCuenta(adminToSearch: Admin, adminToUpdate: Admin, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Admin> {
        return await iPersistenciaCuenta.actualizarCuenta(adminToSearch, adminToUpdate) as Admin;
    }

    public async eliminarCuenta(admin: Admin, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Admin> {
        return await iPersistenciaCuenta.eliminarCuenta(admin) as Admin;
    }

}