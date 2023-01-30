import {
	Button,
	Card,
	Datepicker,
	DateService,
	I18nConfig,
	Icon,
	Input,
	Layout,
	Modal,
	NativeDateService,
	Text,
	Toggle,
} from "@ui-kitten/components";
import { Children, useEffect, useReducer, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StockBook from "../../core/entities/StockBook";
import stockBookViMo, { StockBookObserver } from "../../viewmodel/StockBookViMo";
import { StockBookScreenProps } from "../ScreenTypes";

const HeaderComponent = () => (
	<Layout style={[styles.common, styles.header, { zIndex: 0 }]}>
		<Icon name="book" fill="white" height="50" width="50" />
		<Text category='h2' style={{ color: "white", fontFamily: "serif" }}>
			Artículo en Stock
		</Text>
	</Layout>
);

const BodyComponent = (props: { book: StockBook; isEditionActive: boolean }) => (
	<Layout style={styles.body}>
		<BookTop book={props.book} isEditionActive={props.isEditionActive} />
		<BookMiddle book={props.book} isEditionActive={props.isEditionActive} />
		<BookBottom book={props.book} isEditionActive={props.isEditionActive} />
	</Layout>
);

const useDatepickerState = (initialDate: Date = new Date()) => {
	const [date, setDate] = useState<Date>(initialDate);
	stockBookViMo.updateDraftDate(date);
	return { date, onSelect: setDate };
};

const i18n: I18nConfig = {
	dayNames: {
		short: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		long: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
	},
	monthNames: {
		short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		long: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
	},
};

const toDate = function (date?: string) {
	try {
		if (date !== undefined) {
			const dateSplitted = date?.split("/");
			if (dateSplitted !== undefined) {
				if (dateSplitted.length === 3) {
					let newDate = new Date(1900, 0, 1);
					newDate = new Date(Number.parseInt(dateSplitted[2]), Number.parseInt(dateSplitted[1]) - 1, Number.parseInt(dateSplitted[0]));
					return newDate;
				} else if (dateSplitted.length === 1) {
					return new Date(Number.parseInt(dateSplitted[0]), 0, 1);
				}
			}
		}
		return new Date(1900, 0, 1);
	} catch (error) {
		console.log(error);
		return new Date(1900, 0, 1);
	}
};

const localeDateService = new NativeDateService("ec", { i18n, startDayOfWeek: 1 });
const DatepickerIcon = () => <Icon name="calendar" fill="black" height="10" width="10" />;
const BookTop = (props: {
	book: StockBook;
	isEditionActive: boolean;
}) => {
	const [releaseDate, setReleaseDate] = useState(props.book.getReleaseDate());
	const [title, setTitle] = useState(props.book.getTitle());
	const [isbn, setIsbn] = useState(props.book.getIsbn());
	const [author, setAuthor] = useState(props.book.getAuthor());

	const localePickerState = useDatepickerState(toDate(releaseDate));

	useEffect(() => {
		localePickerState.onSelect(toDate(props.book.getReleaseDate()));
		setReleaseDate(props.book.getReleaseDate());
		setTitle(props.book.getTitle());
		setIsbn(props.book.getIsbn());
		setAuthor(props.book.getAuthor());
	}, [props.book]);

	return (
		<Layout style={styles.bodyTop}>
			<Layout
				style={{
					backgroundColor: "gainsboro",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
					borderRadius: 20,
					margin: 5,
				}}
			>
				<Text>Fecha de Lanzamiento: </Text>
				<Datepicker
					disabled={!props.isEditionActive}
					size="small"
					accessoryLeft={DatepickerIcon}
					min={new Date(1900, 0, 1)}
					dateService={localeDateService}
					{...localePickerState}
				/>
			</Layout>
			<Layout style={{ flexDirection: "row" }}>
				<Layout style={styles.topLeftPanel}>
					<Image style={styles.image} source={require("../../../assets/bookstore.png")} />
				</Layout>
				<Layout style={[styles.common, styles.topRightPanel]}>
					<Layout style={styles.inputLayout}>
						<Layout style={styles.inputTitle}>
							<Text adjustsFontSizeToFit>Título</Text>
						</Layout>
						<ScrollView
							horizontal
							alwaysBounceHorizontal
							showsVerticalScrollIndicator={false}
							fadingEdgeLength={50}
							contentContainerStyle={{ width: `${title?.length !== undefined && title?.length < 30 ? "100%" : "auto"}` }}
						>
							<Input
								disabled={!props.isEditionActive}
								value={title}
								selectionColor='black'
								style={styles.input}
								onChangeText={(newTitle) => {
									setTitle(newTitle);
								}}
								onEndEditing={() => {
									props.book.setTitle(title || "");
									stockBookViMo.updateDraft(props.book);
								}}
							/>
						</ScrollView>
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={styles.inputTitle}>
							<Text adjustsFontSizeToFit>ISBN</Text>
						</Layout>
						<ScrollView
							horizontal
							alwaysBounceHorizontal
							showsVerticalScrollIndicator={false}
							fadingEdgeLength={50}
							contentContainerStyle={{ width: `${isbn?.length !== undefined && isbn?.length < 30 ? "100%" : "auto"}` }}
						>
							<Input
								disabled={!props.isEditionActive}
								value={isbn}
								selectionColor='black'
								style={styles.input}
								onChangeText={(newIsbn) => setIsbn(newIsbn)}
								onEndEditing={() => {
									props.book.setIsbn(isbn || "");
									stockBookViMo.updateDraft(props.book);
								}}
							/>
						</ScrollView>
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={styles.inputTitle}>
							<Text adjustsFontSizeToFit>Autor</Text>
						</Layout>
						<ScrollView
							horizontal
							alwaysBounceHorizontal
							showsVerticalScrollIndicator={false}
							fadingEdgeLength={50}
							contentContainerStyle={{ width: `${author?.length !== undefined && author?.length < 30 ? "100%" : "auto"}` }}
						>
							<Input
								disabled={!props.isEditionActive}
								value={author}
								selectionColor='black'
								style={styles.input}
								onChangeText={(newAuthor) => setAuthor(newAuthor)}
								onEndEditing={() => {
									props.book.setAuthor(author || "");
									stockBookViMo.updateDraft(props.book);
								}}
							/>
						</ScrollView>
					</Layout>
				</Layout>
			</Layout>
		</Layout>
	);
};

const BookMiddle = (props: {
	book: StockBook;
	isEditionActive: boolean;
}) => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();

	const [recommended, setRecommended] = useState(props.book.isRecommended());
	const [bestSeller, setBestSeller] = useState(props.book.isBestSeller());
	const [recent, setRecent] = useState(props.book.isRecent());
	const [visible, setVisible] = useState(props.book.isVisible());
	const [inOffer, setInOffer] = useState(props.book.isInOffer());
	const [discountPercentage, setDiscountPercentage] = useState(props.book.getDiscountPercentage());
	const [hasIva, setHasIva] = useState(props.book.itHasIva());
	const [ivaPercentage, setIvaPercentage] = useState(props.book.getIvaPercentage());
	const [grossPricePerUnit, setGrossPricePerUnit] = useState(props.book.getGrossPricePerUnit());
	const [stock, setStock] = useState(props.book.getStock());

	useEffect(() => {
		setRecommended(props.book.isRecommended());
		setBestSeller(props.book.isBestSeller());
		setRecent(props.book.isRecent());
		setVisible(props.book.isVisible());
		setInOffer(props.book.isInOffer());
		setDiscountPercentage(props.book.getDiscountPercentage());
		setHasIva(props.book.itHasIva());
		setIvaPercentage(props.book.getIvaPercentage());
		setGrossPricePerUnit(props.book.getGrossPricePerUnit());
		setStock(props.book.getStock());
	}, [props.book]);

	return (
		<Layout style={[styles.common, styles.bodyMiddle]}>
			<Layout
				style={{
					flex: 2,
					backgroundColor: "gray",
					flexDirection: "row",
					justifyContent: "space-between",
					marginHorizontal: 5,
					padding: 5,
					borderRadius: 5,
				}}
			>
				<Layout style={{ width: "10%" }} />
				<Layout style={{ width: "70%", flexDirection: "row", justifyContent: "space-evenly" }}>
					<Layout style={{ width: "30%", alignItems: "center" }}>
						<Text style={{ fontSize: 10 }}>Reciente</Text>
						<TouchableOpacity
							disabled={!props.isEditionActive}
							style={{ opacity: !props.isEditionActive ? 0.7 : 1 }}
							onPress={() => {
								setRecent(!recent);
								props.book.setRecent(recent ? recent : false);
								stockBookViMo.updateDraft(props.book);
							}}
						>
							{!props.isEditionActive ? (
								<Icon name="clock-outline" fill={recent ? "darkred" : "darkgray"} height="35" width="35" />
							) : (
								<Icon name="clock" fill={recent ? "darkred" : "darkgray"} height="35" width="35" />
							)}
						</TouchableOpacity>
					</Layout>
					<Layout style={{ width: "30%", alignItems: "center" }}>
						<Text style={{ fontSize: 10 }}>Más vendido</Text>
						<TouchableOpacity
							disabled={!props.isEditionActive}
							style={{ opacity: !props.isEditionActive ? 0.7 : 1 }}
							onPress={() => {
								setBestSeller(!bestSeller);
								props.book.setBestSeller(bestSeller ? bestSeller : false);
								stockBookViMo.updateDraft(props.book);
							}}
						>
							{!props.isEditionActive ? (
								<Icon name="star-outline" fill={bestSeller ? "gold" : "darkgray"} height="35" width="35" />
							) : (
								<Icon name="star" fill={bestSeller ? "gold" : "darkgray"} height="35" width="35" />
							)}
						</TouchableOpacity>
					</Layout>
					<Layout style={{ width: "30%", alignItems: "center" }}>
						<Text style={{ fontSize: 10 }}>Recomendado</Text>
						<TouchableOpacity
							disabled={!props.isEditionActive}
							style={{ opacity: !props.isEditionActive ? 0.7 : 1 }}
							onPress={() => {
								setRecommended(!recommended);
								props.book.setRecommended(recommended ? recommended : false);
								stockBookViMo.updateDraft(props.book);
							}}
						>
							{!props.isEditionActive ? (
								<Icon name="checkmark-circle-2-outline" fill={recommended ? "darkgreen" : "darkgray"} height="35" width="35" />
							) : (
								<Icon name="checkmark-circle-2" fill={recommended ? "darkgreen" : "darkgray"} height="35" width="35" />
							)}
						</TouchableOpacity>
					</Layout>
				</Layout>
				<Layout style={{ width: "10%", justifyContent: "center", alignItems: "flex-end" }}>
					<TouchableOpacity
						disabled={!props.isEditionActive}
						style={{ opacity: !props.isEditionActive ? 0.7 : 1 }}
						onPress={() => {
							setVisible(!visible);
							props.book.setVisible(visible ? visible : false);
							stockBookViMo.updateDraft(props.book);
						}}
					>
						{!props.isEditionActive ? (
							<Icon name={visible ? "eye-outline" : "eye-off-outline"} fill={visible ? "black" : "darkgray"} height="35" width="35" />
						) : (
							<Icon name={visible ? "eye" : "eye-off"} fill={visible ? "black" : "darkgray"} height="35" width="35" />
						)}
					</TouchableOpacity>
				</Layout>
			</Layout>
			<Modal
				visible={modalVisibility}
				backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onBackdropPress={() => setModalVisibility(false)}
				children={modalChildren}
			/>
			<Layout style={{ flex: 4, flexDirection: "row" }}>
				<Layout
					style={{
						backgroundColor: "black",
						width: "70%",
						height: "100%",
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<Layout style={{ width: "30%", height: "100%", justifyContent: "space-around" }}>
						<Toggle
							disabled={!props.isEditionActive}
							checked={inOffer}
							onChange={() => {
								setInOffer(!inOffer);
								props.book.setInOffer(inOffer ? inOffer : false);
								stockBookViMo.updateDraft(props.book);
							}}
						/>
						<Toggle
							disabled={!props.isEditionActive}
							checked={hasIva}
							onChange={() => {
								setHasIva(!hasIva);
								props.book.setHasIva(hasIva ? hasIva : false);
								stockBookViMo.updateDraft(props.book);
							}}
						/>
					</Layout>
					<Layout style={{ backgroundColor: "red", width: "30%", height: "100%", justifyContent: "space-around" }}>
						<Text>Descuento</Text>
						<Text>IVA</Text>
					</Layout>
					<Layout style={{ width: "30%", height: "100%", justifyContent: "space-around", alignItems: "center" }}>
						<Button
							disabled={!props.isEditionActive}
							size="tiny"
							onPress={() => {
								setModalChildren(<ModalDiscount setModalVisibility={setModalVisibility} />);
								setModalVisibility(true);
							}}
						>
							{inOffer ? discountPercentage : "0"}
						</Button>
						<Button disabled={true} size="tiny">
							{hasIva ? "12" : "0"}
						</Button>
					</Layout>
				</Layout>
				<Layout style={{ width: "30%", justifyContent: "space-around", alignItems: "flex-end" }}>
					<Layout style={{ flexDirection: "row" }}>
						<Button
							disabled={!props.isEditionActive}
							size="small"
							onPress={() => {
								setModalChildren(
									<ModalPrice
										isEditionActive={props.isEditionActive}
										setModalVisibility={setModalVisibility}
										grossPricePerUnit={grossPricePerUnit || 0}
										setGrossPricePerUnit={setGrossPricePerUnit}
									/>,
								);
								setModalVisibility(true);
							}}
						>
							{grossPricePerUnit?.toFixed(2) || ""}
						</Button>
						<Text style={{ textAlignVertical: "center", fontSize: 25 }}> 💲</Text>
					</Layout>
					<Layout style={{ flexDirection: "row" }}>
						<Button disabled={!props.isEditionActive} size="small" onPress={() => setModalVisibility(true)}>
							{stock || ""}
						</Button>
						<Text style={{ textAlignVertical: "center", fontSize: 25 }}> 📦</Text>
					</Layout>
				</Layout>
			</Layout>
		</Layout>
	);
};
const ModalDiscount = (props: { setModalVisibility: React.Dispatch<React.SetStateAction<boolean>> }) => (
	<Card disabled={true}>
		<Text>Cambiar porcentaje de Descuento</Text>
		<Button onPress={() => props.setModalVisibility(false)}>DISMISS</Button>
	</Card>
);
const ModalPrice = (props: {
	isEditionActive: boolean;
	setModalVisibility: (value: boolean) => void;
	grossPricePerUnit: number;
	setGrossPricePerUnit: (value: number) => void;
}) => (
	<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
		<Text>Ingresar nuevo % de Descuento</Text>
		<Input
			disabled={!props.isEditionActive}
			size="small"
			cursorColor='black'
			style={{ marginVertical: 20 }}
			selectTextOnFocus
			defaultValue={props.grossPricePerUnit.toString()}
			onChangeText={(newPrice) => {
				const parsed = Number.parseFloat(newPrice);
				if (parsed) props.setGrossPricePerUnit(parsed);
				else props.setGrossPricePerUnit(props.grossPricePerUnit);
			}}
			// onEndEditing={() => {
			// 	props.book.setIsbn(isbn || "");
			// 	stockBookViMo.updateDraft(props.book);
			// }}
		/>
		<Button size="small" style={{ width: "30%" }} onPress={() => props.setModalVisibility(false)}>
			OK
		</Button>
	</Layout>
);

const BookBottom = (props: { book: StockBook; isEditionActive: boolean }) => {
	const [description, setDescription] = useState(props.book.getDescription());
	const createdDate = props.book.getCreatedDate();
	const dateSplitted = createdDate?.split("T")[0].split("-");

	useEffect(() => {
		setDescription(props.book.getDescription());
	}, [props.book]);

	return (
		<Layout style={[styles.common, styles.bodyBottom]}>
			<Layout>
				<Layout style={styles.inputTitle}>
					<Text adjustsFontSizeToFit>Descripción</Text>
				</Layout>
				<Input
					multiline
					disabled={!props.isEditionActive}
					value={description}
					selectionColor='black'
					textStyle={{ height: 100 }}
					style={[
						styles.input,
						{
							borderColor: "darkgrey",
							borderWidth: 1,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						},
					]}
					onChangeText={(newDescription) => {
						setDescription(newDescription);
					}}
					onEndEditing={() => {
						props.book.setDescription(description || "");
						stockBookViMo.updateDraft(props.book);
					}}
				/>
			</Layout>
			<Layout style={[styles.common, { flexDirection: "row", justifyContent: "space-around", alignItems: "center" }]}>
				<Button
					disabled={props.isEditionActive}
					status={!props.isEditionActive ? "warning" : "basic"}
					size="tiny"
					accessoryLeft={EditIcon}
					style={{ width: "25%" }}
					onPress={() => stockBookViMo.turnOnEditor()}
				/>
				<Button
					disabled={!props.isEditionActive}
					status={!props.isEditionActive ? "basic" : "danger"}
					size="tiny"
					accessoryLeft={SlashIcon}
					style={{ width: "20%" }}
					onPress={() => stockBookViMo.deleteCurrentDraft()}
				/>
				<Button
					disabled={!props.isEditionActive}
					status={!props.isEditionActive ? "basic" : "danger"}
					size="tiny"
					accessoryLeft={DeleteIcon}
					style={{ width: "20%" }}
				/>
				<Button
					disabled={!props.isEditionActive}
					status={!props.isEditionActive ? "basic" : "success"}
					size="tiny"
					accessoryLeft={SaveIcon}
					style={{ width: "25%" }}
				/>
			</Layout>
			<Layout>
				<Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "right" }}>{`(Fecha de creación del registro: ${Intl.DateTimeFormat("es-ec", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				}).format(
					dateSplitted !== undefined
						? new Date(Number.parseInt(dateSplitted[0]), Number.parseInt(dateSplitted[1]) - 1, Number.parseInt(dateSplitted[2]))
						: new Date(2000, 0, 1),
				)})`}</Text>
			</Layout>
		</Layout>
	);
};
const EditIcon = () => <Icon name="edit" fill="white" height="30" width="30" />;
const SlashIcon = () => <Icon name="slash" fill="white" height="30" width="30" />;
const DeleteIcon = () => <Icon name="trash-2" fill="white" height="30" width="30" />;
const SaveIcon = () => <Icon name="save" fill="white" height="30" width="30" />;

const StockBookScreen = ({ route }: StockBookScreenProps) => {
	const [book, setBook] = useState(stockBookViMo.getStockBookFromBooksList(route.params.bookIndex));
	const [isEditionActive, setEditionState] = useState(false);

	const updateState: StockBookObserver = (stockBook: StockBook, isEditingActive: boolean) => {
		setBook(stockBook);
		setEditionState(isEditingActive);
	};

	useEffect(() => {}, [book]);

	useEffect(() => {
		stockBookViMo.attach(updateState);
		return () => stockBookViMo.detach();
	}, []);

	return (
		<Layout style={[styles.common, styles.container]}>
			<HeaderComponent />
			<BodyComponent book={book} isEditionActive={isEditionActive} />
		</Layout>
	);
};

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		textAlign: "center",
	},
	container: { backgroundColor: "black", flex: 1, paddingTop: 10 },
	header: {
		backgroundColor: "black",
		zIndex: 0,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		color: "white",
	},
	body: { flex: 9, width: "100%" },
	bodyTop: { zIndex: 1, flex: 6, backgroundColor: "gold", padding: 5 },
	bodyMiddle: { zIndex: 0, flex: 3, backgroundColor: "blue", padding: 5 },
	bodyBottom: { zIndex: 1, flex: 6, backgroundColor: "black", justifyContent: "space-around", padding: 5 },
	topLeftPanel: {
		backgroundColor: "gainsboro",
		width: "35%",
		height: 250,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		marginHorizontal: 5,
	},
	topRightPanel: { backgroundColor: "red", width: "60%", height: 250, justifyContent: "space-around" },
	inputLayout: { justifyContent: "center" },
	inputTitle: {
		backgroundColor: "darkgrey",
		width: "30%",
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	input: {
		width: "100%",
		borderRadius: 0,
		borderWidth: 0,
		borderBottomWidth: 2,
		borderColor: "darkgrey",
	},
	image: {
		maxWidth: "80%",
		maxHeight: 120,
		resizeMode: "contain",
	},
});

export default StockBookScreen;
