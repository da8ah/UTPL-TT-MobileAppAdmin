import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class GestionDeTransacciones {

    public async listarTodasLasTransacciones(iPersistenciaTransacciones: IPersistenciaTransacciones) {
        return await iPersistenciaTransacciones.consultarTodasLasTransacciones();
    }

}