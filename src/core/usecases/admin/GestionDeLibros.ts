import StockBook from "../../entities/StockBook";
import IPersistenciaLibro from "../../ports/persistencia/IPersistenciaLibro";

export default class GestionDeLibros {

    public async crearLibro(stockBook: StockBook, iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook> {
        const bookFound = await iPersistenciaLibro.buscarUnLibroByIsbn(stockBook);
        if (bookFound.getIsbn()) return stockBook;
        return iPersistenciaLibro.guardarLibroNuevo(stockBook);
    }

    // Two StockBooks required in case of ISBN update
    public async actualizarLibro(bookToSearch: StockBook, bookToUpdate: StockBook, iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook> {
        return iPersistenciaLibro.actualizarLibro(bookToSearch, bookToUpdate);
    }

    public async eliminarLibro(stockBook: StockBook, iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook> {
        return iPersistenciaLibro.eliminarLibro(stockBook);
    }

}