import Book from "./Book";

export default class ToBuyBook extends Book {
	private discountedAmount: number | undefined = undefined;
	private ivaAmount: number | undefined = undefined;
	private priceWithDiscount: number | undefined = undefined;
	private priceWithIva: number | undefined = undefined;
	private cant: number | undefined = undefined;
	private priceCalcPerUnit: number | undefined = undefined;

	constructor(
		isbn?: string,
		imgRef?: string,
		title?: string,
		author?: string,
		releaseDate?: string,
		grossPricePerUnit?: number,
		inOffer?: boolean,
		discountPercentage?: number,
		hasIva?: boolean,
		cant?: number,
	) {
		super(isbn, imgRef, title, author, releaseDate, grossPricePerUnit, inOffer, discountPercentage, hasIva);
		this.cant = cant;
		this.calculate();
	}

	public calculate(): void {
		const discountPercentage = this.getDiscountPercentage();
		const ivaPercentage = this.getIvaPercentage();
		const grossPricePerUnit = this.getGrossPricePerUnit();
		// Calc Per Unit
		if (discountPercentage !== undefined && ivaPercentage !== undefined && grossPricePerUnit !== undefined && this.cant !== undefined) {
			this.discountedAmount = (discountPercentage * grossPricePerUnit) / 100;
			this.ivaAmount = (ivaPercentage * grossPricePerUnit) / 100;
			this.priceWithDiscount = grossPricePerUnit - this.discountedAmount;
			this.priceWithIva = grossPricePerUnit + this.ivaAmount;
			this.priceCalcPerUnit = grossPricePerUnit - this.discountedAmount + this.ivaAmount;
		}
	}

	public getDiscountedAmount(): number | undefined {
		return this.discountedAmount;
	}

	public getIvaAmount(): number | undefined {
		return this.ivaAmount;
	}

	public getPriceWithDiscount(): number | undefined {
		return this.priceWithDiscount;
	}

	public getPriceWithIva(): number | undefined {
		return this.priceWithIva;
	}

	public getCant(): number | undefined {
		return this.cant;
	}

	public getPriceCalcPerUnit(): number | undefined {
		return this.priceCalcPerUnit;
	}
}
