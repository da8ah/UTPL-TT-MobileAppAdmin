import StockBook from "./StockBook";

export type IStockBook = {
	isbn?: string;
	imgRef?: string;
	title?: string;
	author?: string;
	releaseDate?: string;
	grossPricePerUnit?: number;
	inOffer?: boolean;
	discountPercentage?: number;
	hasIva?: boolean;
	ivaPercentage?: number;
	createdDate?: string;
	description?: string;
	stock?: number;
	visible?: boolean;
	recommended?: boolean;
	bestSeller?: boolean;
	recent?: boolean;
};

export class BookConverter {
	public static bookToJSON(stockBook: StockBook): JSON {
		let json: IStockBook = {
			isbn: "",
			imgRef: "",
			title: "",
			author: "",
			releaseDate: "",
			grossPricePerUnit: 0,
			inOffer: false,
			discountPercentage: 0,
			hasIva: false,
			ivaPercentage: 0,
			createdDate: "",
			description: "",
			stock: 0,
			visible: false,
			recommended: false,
			bestSeller: false,
			recent: false,
		};
		json.isbn = stockBook.getIsbn() || "";
		json.imgRef = stockBook.getImgRef() || "";
		json.title = stockBook.getTitle() || "";
		json.author = stockBook.getAuthor() || "";
		json.releaseDate = stockBook.getReleaseDate() || "";
		json.grossPricePerUnit = stockBook.getGrossPricePerUnit() || 0;
		if (stockBook.isInOffer() !== undefined) json.inOffer = stockBook.isInOffer();
		json.discountPercentage = stockBook.getDiscountPercentage() || 0;
		if (stockBook.itHasIva()) json.hasIva = stockBook.itHasIva();
		json.ivaPercentage = stockBook.getIvaPercentage() || 0;
		json.createdDate = stockBook.getCreatedDate() || "";
		json.description = stockBook.getDescription() || "";
		json.stock = stockBook.getStock() || 0;
		if (stockBook.isVisible()) json.visible = stockBook.isVisible();
		if (stockBook.isRecommended()) json.recommended = stockBook.isRecommended();
		if (stockBook.isBestSeller()) json.bestSeller = stockBook.isBestSeller();
		if (stockBook.isRecent()) json.recent = stockBook.isRecent();
		return JSON.parse(JSON.stringify(json));
	}

	public static jsonToBook(res: IStockBook): StockBook {
		// All Attrs from body
		const {
			isbn,
			imgRef,
			title,
			author,
			releaseDate,
			grossPricePerUnit,
			inOffer,
			discountPercentage,
			hasIva,
			createdDate,
			description,
			stock,
			visible,
			recommended,
			bestSeller,
			recent,
		} = res;

		// NewStockBook with all Attrs
		return new StockBook(
			isbn,
			imgRef,
			title,
			author,
			releaseDate,
			grossPricePerUnit,
			inOffer,
			discountPercentage,
			hasIva,
			createdDate,
			description,
			stock,
			visible,
			recommended,
			bestSeller,
			recent,
		);
	}

	// public static modelToBook(bookModel: IStockBookModel): StockBook {
	// 	return new StockBook(
	// 		bookModel.isbn,
	// 		bookModel.imgRef,
	// 		bookModel.title,
	// 		bookModel.author,
	// 		bookModel.releaseDate,
	// 		bookModel.grossPricePerUnit,
	// 		bookModel.inOffer,
	// 		bookModel.discountPercentage,
	// 		bookModel.hasIva,
	// 		bookModel.createdDate,
	// 		bookModel.description,
	// 		bookModel.stock,
	// 		bookModel.visible,
	// 		bookModel.recommended,
	// 		bookModel.bestSeller,
	// 		bookModel.recent,
	// 	);
	// }

	// public static bookToModel(stockBook: StockBook): IStockBookModel {
	// 	return new StockBookModel({
	// 		isbn: stockBook.getIsbn(),
	// 		imgRef: stockBook.getImgRef(),
	// 		title: stockBook.getTitle(),
	// 		author: stockBook.getAuthor(),
	// 		releaseDate: stockBook.getReleaseDate(),
	// 		grossPricePerUnit: stockBook.getGrossPricePerUnit(),
	// 		inOffer: stockBook.isInOffer(),
	// 		discountPercentage: stockBook.getDiscountPercentage(),
	// 		hasIva: stockBook.itHasIva(),
	// 		ivaPercentage: stockBook.getIvaPercentage(),
	// 		createdDate: stockBook.getCreatedDate(),
	// 		description: stockBook.getDescription(),
	// 		stock: stockBook.getStock(),
	// 		visible: stockBook.isVisible(),
	// 		recommended: stockBook.isRecommended(),
	// 		bestSeller: stockBook.isBestSeller(),
	// 		recent: stockBook.isRecent(),
	// 	});
	// }
}

// export class ClientConverter {
// 	private static billingInfoToJSON(billingInfo: BillingInfo): JSON {
// 		let json: any = {};
// 		if (billingInfo.getToWhom() != undefined) json["toWhom"] = billingInfo.getToWhom();
// 		if (billingInfo.getCi() != undefined) json["ci"] = billingInfo.getCi();
// 		if (billingInfo.getProvincia() != undefined) json["provincia"] = billingInfo.getProvincia();
// 		if (billingInfo.getCiudad() != undefined) json["ciudad"] = billingInfo.getCiudad();
// 		if (billingInfo.getNumCasa() != undefined) json["numCasa"] = billingInfo.getNumCasa();
// 		if (billingInfo.getCalles() != undefined) json["calles"] = billingInfo.getCalles();
// 		return json;
// 	}

// 	private static cardToJSON(card: Card): JSON {
// 		let json: any = {};
// 		if (card.getOwnerName() != undefined) json["ownerName"] = card.getOwnerName();
// 		if (card.getCardNumber() != undefined) json["cardNumber"] = card.getCardNumber();
// 		if (card.getCode() != undefined) json["code"] = card.getCode();
// 		if (card.getExpiryDate() != undefined) json["expiryDate"] = card.getExpiryDate();
// 		return json;
// 	}

// 	public static clientToJSON(client: Client): JSON {
// 		let json: any = {};
// 		if (client.getUser() != undefined) json["user"] = client.getUser();
// 		if (client.getName() != undefined) json["name"] = client.getName();
// 		if (client.getEmail() != undefined) json["email"] = client.getEmail();
// 		if (client.getMobile() != undefined) json["mobile"] = client.getMobile();
// 		if (client.getPassword() != undefined) json["password"] = client.getPassword();

// 		const billingInfo = client.getBillingInfo();
// 		if (billingInfo != undefined) json["billingInfo"] = this.billingInfoToJSON(billingInfo);
// 		const cards = client.getCards();
// 		if (cards != undefined) json["cards"] = cards.map((card) => this.cardToJSON(card));
// 		const transactions = client.getTransactions();
// 		if (transactions != undefined)
// 			json["transactions"] = transactions.map((transaction) => TransactionConverter.cardTransactionToJSON(transaction as CardTransaction));

// 		return json;
// 	}

// 	private static jsonToBillingInfo(iBillingInfo: IBillingInfoModel): BillingInfo {
// 		return new BillingInfo(
// 			iBillingInfo.toWhom,
// 			iBillingInfo.ci,
// 			iBillingInfo.provincia,
// 			iBillingInfo.ciudad,
// 			iBillingInfo.numCasa,
// 			iBillingInfo.calles,
// 		);
// 	}

// 	private static jsonToCard(iCard: ICardModel): Card {
// 		return new Card(iCard.ownerName, iCard.cardNumber, iCard.code, iCard.expiryDate);
// 	}

// 	public static jsonToClient(req: Request): Client {
// 		const { user, name, email, mobile, password, billingInfo } = req.body;

// 		const client = new Client(user, name, email, mobile, password);

// 		if (billingInfo) client.setBillingInfo(this.jsonToBillingInfo(billingInfo));

// 		return client;
// 	}

// 	public static modelToClient(clientModel: IClientModel): Client {
// 		const client = new Client(clientModel.user, clientModel.name, clientModel.email, clientModel.mobile, clientModel.password);

// 		if (clientModel.billingInfo) client.setBillingInfo(this.jsonToBillingInfo(clientModel.billingInfo));
// 		if (clientModel.cards && clientModel.cards.length > 0) client.setCards(clientModel.cards.map((card) => this.jsonToCard(card)));

// 		return client;
// 	}

// 	public static clientToModel(client: Client): IClientModel {
// 		return new ClientModel({
// 			user: client.getUser(),
// 			name: client.getName(),
// 			email: client.getEmail(),
// 			mobile: client.getMobile(),
// 			password: client.getPassword(),
// 			billingInfo: client.getBillingInfo(),
// 			cards: client.getCards(),
// 			transactions: client.getTransactions()?.map((transaction) => transaction.getId()),
// 		});
// 	}
// }

// export class TransactionConverter {
// 	static cardTransactionToJSON(cardTransaction: CardTransaction): JSON {
// 		let json: any = {};
// 		if (cardTransaction.getId() != undefined) json["id"] = cardTransaction.getId();
// 		if (cardTransaction.getDate() != undefined) json["date"] = cardTransaction.getDate();
// 		if (cardTransaction.getPayment() != undefined) json["payment"] = cardTransaction.getPayment();
// 		if (cardTransaction.getChange() != undefined) json["change"] = cardTransaction.getChange();
// 		if (cardTransaction.getCart() != undefined) json["cart"] = JSON.parse(JSON.stringify(cardTransaction.getCart()));
// 		return json;
// 	}

// 	public static jsonToCardTransaction(req: Request): Client {
// 		const { user, name, email, mobile, password, cards, transactions } = req.body;

// 		const { id, date, payment, change, cart } = transactions;

// 		const { discountCalc, ivaCalc, subtotal, totalPrice, toBuyBooks } = cart;

// 		const card = Object.assign(new Card(), cards[0]);
// 		const books = toBuyBooks.map(
// 			(book: any) =>
// 				new ToBuyBook(
// 					book.isbn,
// 					book.imgRef,
// 					book.title,
// 					book.author,
// 					book.releaseDate,
// 					book.grossPricePerUnit,
// 					book.inOffer,
// 					book.discountPercentage,
// 					book.hasIva,
// 					book.cant,
// 				),
// 		);

// 		const newCart = new Cart(discountCalc, ivaCalc, subtotal, totalPrice, books);

// 		const transaction = new CardTransaction(id, date, payment, change, newCart);

// 		const client = new Client(user, name, email, mobile, undefined);

// 		client.setCards([card]);
// 		client.setTransactions([transaction]);

// 		return client;
// 	}

// 	public static modelToCardTransactionWithClient(cardTransactionModel: ICardTransactionModel): Client {
// 		const books: ToBuyBook[] = cardTransactionModel.booksAcquired.map(
// 			(book) =>
// 				new ToBuyBook(
// 					book.isbn,
// 					book.imgRef,
// 					book.title,
// 					book.author,
// 					book.releaseDate,
// 					book.grossPricePerUnit,
// 					book.inOffer,
// 					book.discountPercentage,
// 					book.hasIva,
// 					book.cant,
// 				),
// 		);

// 		const cart = new Cart(
// 			cardTransactionModel.discountCalc,
// 			cardTransactionModel.ivaCalc,
// 			cardTransactionModel.subtotal,
// 			cardTransactionModel.totalPrice,
// 			books,
// 		);

// 		const cardTransaction = new CardTransaction(
// 			cardTransactionModel.id,
// 			cardTransactionModel.date,
// 			cardTransactionModel.payment,
// 			cardTransactionModel.change,
// 			cart,
// 		);

// 		const card = new Card(cardTransactionModel.card.ownerName, cardTransactionModel.card.cardNumber, undefined, cardTransactionModel.card.expiryDate);

// 		const client = new Client(
// 			cardTransactionModel.client.user,
// 			cardTransactionModel.client.name,
// 			cardTransactionModel.client.email,
// 			cardTransactionModel.client.mobile,
// 		);

// 		client.setCards([card]);
// 		client.setTransactions([cardTransaction]);

// 		return client;
// 	}

// 	public static cardTransactionWithClientToModel(client: Client): ICardTransactionModel {
// 		const transactions = client.getTransactions();
// 		const cards = client.getCards();
// 		if (transactions != undefined && cards != undefined) {
// 			const transaction = transactions[0];
// 			const card = cards[0];
// 			const cart = transactions[0].getCart();
// 			if (cart) {
// 				const books = cart.getToBuyBooks();
// 				return new CardTransactionModel({
// 					id: crypto.randomUUID(),
// 					date: transaction.getDate(),
// 					payment: transaction.getPayment(),
// 					change: transaction.getChange(),
// 					card: {
// 						ownerName: card.getOwnerName(),
// 						cardNumber: card.getCardNumber(),
// 						expiryDate: card.getExpiryDate(),
// 					},
// 					client: {
// 						user: client.getUser(),
// 						name: client.getName(),
// 						email: client.getEmail(),
// 						mobile: client.getMobile(),
// 					},
// 					booksAcquired: books,
// 					discountCalc: cart.getDiscountCalc(),
// 					ivaCalc: cart.getIvaCalc(),
// 					subtotal: cart.getSubtotal(),
// 					totalPrice: cart.getTotalPrice(),
// 				});
// 			}
// 		}
// 		return new CardTransactionModel();
// 	}

// 	public static modelToCardTransaction(cardTransactionModel: ICardTransactionModel): CardTransaction {
// 		const books: ToBuyBook[] = cardTransactionModel.booksAcquired.map(
// 			(book) =>
// 				new ToBuyBook(
// 					book.isbn,
// 					book.imgRef,
// 					book.title,
// 					book.author,
// 					book.releaseDate,
// 					book.grossPricePerUnit,
// 					book.inOffer,
// 					book.discountPercentage,
// 					book.hasIva,
// 					book.cant,
// 				),
// 		);

// 		const cart = new Cart(
// 			cardTransactionModel.discountCalc,
// 			cardTransactionModel.ivaCalc,
// 			cardTransactionModel.subtotal,
// 			cardTransactionModel.totalPrice,
// 			books,
// 		);

// 		const cardTransaction = new CardTransaction(
// 			cardTransactionModel.id,
// 			cardTransactionModel.date,
// 			cardTransactionModel.payment,
// 			cardTransactionModel.change,
// 			cart,
// 		);

// 		return cardTransaction;
// 	}
// }

// export class AdminConverter {
// 	public static adminToJSON(admin: Admin): JSON {
// 		let json: any = {};
// 		if (admin.getUser() != undefined) json["user"] = admin.getUser();
// 		if (admin.getName() != undefined) json["name"] = admin.getName();
// 		if (admin.getEmail() != undefined) json["email"] = admin.getEmail();
// 		if (admin.getMobile() != undefined) json["mobile"] = admin.getMobile();
// 		if (admin.getPassword() != undefined) json["password"] = admin.getPassword();
// 		return json;
// 	}

// 	public static jsonToAdmin(req: Request): Admin {
// 		const { user, name, email, mobile, password } = req.body;

// 		const admin = new Admin(user, name, email, mobile, password);

// 		return admin;
// 	}

// 	public static modelToAdmin(adminModel: IAdminModel): Admin {
// 		const admin = new Admin(adminModel.user, adminModel.name, adminModel.email, adminModel.mobile, adminModel.password);
// 		return admin;
// 	}

// 	public static adminToModel(admin: Admin): IAdminModel {
// 		return new AdminModel({
// 			user: admin.getUser(),
// 			name: admin.getName(),
// 			email: admin.getEmail(),
// 			mobile: admin.getMobile(),
// 			password: admin.getPassword(),
// 		});
// 	}
// }
