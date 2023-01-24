export default class BillingInfo {
    private toWhom: string | undefined = undefined;
    private ci: string | undefined = undefined;
    private provincia: string | undefined = undefined;
    private ciudad: string | undefined = undefined;
    private numCasa: string | undefined = undefined;
    private calles: string | undefined = undefined;

    constructor(
        toWhom?: string,
        ci?: string,
        provincia?: string,
        ciudad?: string,
        numCasa?: string,
        calles?: string
    ) {
        this.toWhom = toWhom;
        this.ci = ci;
        this.provincia = provincia;
        this.ciudad = ciudad;
        this.numCasa = numCasa;
        this.calles = calles;
    }

    public getToWhom(): string | undefined {
        return this.toWhom;
    }

    public setToWhom(toWhom: string): void {
        this.toWhom = toWhom;
    }

    public getCi(): string | undefined {
        return this.ci;
    }

    public setCi(ci: string): void {
        this.ci = ci;
    }

    public getProvincia(): string | undefined {
        return this.provincia;
    }

    public setProvincia(provincia: string): void {
        this.provincia = provincia;
    }

    public getCiudad(): string | undefined {
        return this.ciudad;
    }

    public setCiudad(ciudad: string): void {
        this.ciudad = ciudad;
    }

    public getNumCasa(): string | undefined {
        return this.numCasa;
    }

    public setNumCasa(numCasa: string): void {
        this.numCasa = numCasa;
    }

    public getCalles(): string | undefined {
        return this.calles;
    }

    public setCalles(calles: string): void {
        this.calles = calles;
    }
}