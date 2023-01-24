import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";

export default interface IPersistenciaTransacciones {
    guardarNuevaTransaccion(client: Client): Promise<Client>;
    obtenerTransacciones(client: Client): Promise<Client>;
    consultarTodasLasTransacciones(): Promise<Transaction[]>;
}