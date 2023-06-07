import Book from "./Book";

export default class StockBook extends Book {
	private createdDate: string | undefined = undefined;
	private description: string | undefined = undefined;
	private stock: number | undefined = undefined;
	private visible: boolean | undefined = undefined;
	private recommended: boolean | undefined = undefined;
	private bestSeller: boolean | undefined = undefined;
	private recent: boolean | undefined = undefined;

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
		createdDate?: string,
		description?: string,
		stock?: number,
		visible?: boolean,
		recommended?: boolean,
		bestSeller?: boolean,
		recent?: boolean,
	) {
		super(isbn, imgRef, title, author, releaseDate, grossPricePerUnit, inOffer, discountPercentage, hasIva);
		this.createdDate = createdDate;
		this.description = description;
		this.stock = stock;
		this.visible = visible;
		this.recommended = recommended;
		this.bestSeller = bestSeller;
		this.recent = recent;
	}

	public getCreatedDate(): string | undefined {
		return this.createdDate;
	}

	public setCreatedDate(createdDate: string): void {
		this.createdDate = createdDate;
	}

	public getDescription(): string | undefined {
		return this.description;
	}

	public setDescription(description: string): void {
		this.description = description;
	}

	public getStock(): number | undefined {
		return this.stock;
	}

	public setStock(stock: number): void {
		this.stock = stock;
	}

	public isVisible(): boolean | undefined {
		return this.visible;
	}

	public setVisible(visible: boolean): void {
		this.visible = visible;
	}

	public isRecommended(): boolean | undefined {
		return this.recommended;
	}

	public setRecommended(recommended: boolean): void {
		this.recommended = recommended;
	}

	public isBestSeller(): boolean | undefined {
		return this.bestSeller;
	}

	public setBestSeller(bestSeller: boolean): void {
		this.bestSeller = bestSeller;
	}

	public isRecent(): boolean | undefined {
		return this.recent;
	}

	public setRecent(recent: boolean): void {
		this.recent = recent;
	}
}
