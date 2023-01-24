import User from "../../entities/User";

export default interface IPersistenciaCuenta {
    buscarCuenta(user: User): Promise<User>;
    guardarCuentaNueva(user: User): Promise<User>;
    actualizarCuenta(userToSearch: User, userToUpdate: User): Promise<User>;
    eliminarCuenta(user: User): Promise<User>;
}