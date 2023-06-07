export default abstract class Book {
    private isbn: string | undefined = undefined;
    private imgRef: string | undefined = undefined;
    private title: string | undefined = undefined;
    private author: string | undefined = undefined;
    private releaseDate: string | undefined = undefined;
    private grossPricePerUnit: number | undefined = undefined;
    private inOffer: boolean | undefined = undefined;
    private discountPercentage: number | undefined = undefined;
    private hasIva: boolean | undefined = undefined;
    private ivaPercentage: number | undefined = undefined;

    constructor(
        isbn?: string,
        imgRef?: string,
        title?: string,
        author?: string,
        releaseDate?: string,
        grossPricePerUnit?: number,
        inOffer?: boolean,
        discountPercentage?: number,
        hasIva?: boolean
    ) {
        this.isbn = isbn;
        this.imgRef = imgRef;
        this.title = title;
        this.author = author;
        this.releaseDate = releaseDate;
        this.grossPricePerUnit = grossPricePerUnit;
        this.setInOffer(inOffer);
        this.setDiscountPercentage(discountPercentage);
        this.setHasIva(hasIva);
    }

    // Getters
    public getIsbn(): string | undefined {
        return this.isbn;
    }

    public getImgRef(): string | undefined {
        return this.imgRef;
    }

    public getTitle(): string | undefined {
        return this.title;
    }

    public getAuthor(): string | undefined {
        return this.author;
    }

    public getReleaseDate(): string | undefined {
        return this.releaseDate;
    }

    public getGrossPricePerUnit(): number | undefined {
        return this.grossPricePerUnit;
    }

    // Setters
    public setIsbn(value: string) {
        this.isbn = value;
    }
    public setImgRef(value: string) {
        this.imgRef = value;
    }
    public setTitle(value: string) {
        this.title = value;
    }
    public setAuthor(value: string) {
        this.author = value;
    }
    public setReleaseDate(value: string) {
        this.releaseDate = value;
    }
    public setGrossPricePerUnit(value: number) {
        this.grossPricePerUnit = value;
    }

    // Offer & IVA
    public isInOffer(): boolean | undefined {
        return this.inOffer;
    }
    public setInOffer(value: boolean | undefined) {
        this.inOffer = value;
    }
    public getDiscountPercentage(): number | undefined {
        return this.discountPercentage;
    }
    public setDiscountPercentage(discountPercentage: number | undefined) {
        // if this.inOffer = true && (0 < value <= 100); then this.discountPercentage = value;
        // else this.discountPercentage = 0 && this.inOffer = false;
        switch (this.isInOffer()) {
            case false:
                this.discountPercentage = 0;
                break;
            case true:
                if (discountPercentage) {
                    if (discountPercentage > 0 && discountPercentage <= 100) {
                        this.discountPercentage = discountPercentage;
                    } else {
                        this.discountPercentage = 0;
                        this.inOffer = false;
                    }
                } else {
                    this.discountPercentage = undefined;
                    this.inOffer = undefined;
                }
                break;
            default:
                this.discountPercentage = undefined;
                this.inOffer = undefined;
                break;
        }
    }

    public itHasIva(): boolean | undefined {
        return this.hasIva;
    }
    public setHasIva(hasIva: boolean | undefined) {
        // if this.hasIva = true; then this.ivaPercentage = 12;
        // else this.ivaPercentage = 0;
        this.hasIva = hasIva;
        switch (hasIva) {
            case false:
                this.setIvaPercentage(0);
                break;
            case true:
                this.setIvaPercentage(1);
                break;
            default:
                this.setIvaPercentage(undefined);
                break;
        }
    }
    public getIvaPercentage(): number | undefined {
        return this.ivaPercentage;
    }
    private setIvaPercentage(value: number = 0 | 1) {
        switch (value) {
            case 0:
                this.ivaPercentage = 0;
                break;
            case 1:
                this.ivaPercentage = 12;
                break;
            default:
                this.ivaPercentage = undefined;
                break;
        }
    }
}