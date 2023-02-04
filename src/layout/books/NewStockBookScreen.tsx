import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { Button, Datepicker, I18nConfig, Icon, Input, Layout, Modal, NativeDateService, Text, Toggle } from "@ui-kitten/components";
import { createRef, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StockBook from "../../core/entities/StockBook";
import newStockBookViMo, { NewStockBookObserver } from "../../viewmodel/NewStockBookViMo";
import { StockBookScreenProps } from "../ScreenTypes";

const HeaderComponent = () => (
	<Layout style={[styles.common, styles.header, { zIndex: 0 }]}>
		<Icon name="book" fill="white" height="50" width="50" />
		<Text category='h2' style={{ color: "white", fontFamily: "serif" }}>
			Nuevo Artículo
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
	newStockBookViMo.updateDraftDate(date);
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
					let newDate = new Date();
					newDate = new Date(Number.parseInt(dateSplitted[2]), Number.parseInt(dateSplitted[1]) - 1, Number.parseInt(dateSplitted[0]));
					return newDate;
				} else if (dateSplitted.length === 1) {
					return new Date(Number.parseInt(dateSplitted[0]), 0, 1);
				}
			}
		}
		return new Date();
	} catch (error) {
		console.log(error);
		return new Date();
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

	const componentRef = createRef<Datepicker>();
	const localePickerState = useDatepickerState(toDate(releaseDate));

	const DatapickerFooter = () => (
		<Layout style={{ alignItems: "center" }}>
			<Button size="tiny" style={{ width: "30%", marginVertical: 2 }} onPress={scrollToToday}>
				Ir a hoy
			</Button>
		</Layout>
	);
	const scrollToToday = () => {
		if (componentRef.current) {
			componentRef.current.scrollToToday();
		}
	};

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
					ref={componentRef}
					disabled={!props.isEditionActive}
					size="small"
					accessoryLeft={DatepickerIcon}
					min={new Date(1900, 0, 1)}
					dateService={localeDateService}
					{...localePickerState}
					renderFooter={DatapickerFooter}
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
							contentContainerStyle={{ width: title?.length !== undefined ? (title?.length < 30 ? "100%" : "auto") : "100%" }}
						>
							<Input
								disabled={!props.isEditionActive}
								value={title}
								style={styles.input}
								onChangeText={(newTitle) => setTitle(newTitle)}
								onEndEditing={() => {
									props.book.setTitle(title?.trim() || "");
									newStockBookViMo.updateDraft(props.book);
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
							contentContainerStyle={{ width: isbn?.length !== undefined ? (isbn?.length < 30 ? "100%" : "auto") : "100%" }}
						>
							<Input
								disabled={!props.isEditionActive}
								value={isbn}
								style={styles.input}
								onChangeText={(newIsbn) => {
									const regex = new RegExp("^\\d{0,13}$");
									if (regex.test(newIsbn)) setIsbn(newIsbn);
								}}
								onEndEditing={() => {
									props.book.setIsbn(isbn?.trim() || "");
									newStockBookViMo.updateDraft(props.book);
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
							contentContainerStyle={{ width: author?.length !== undefined ? (author?.length < 30 ? "100%" : "auto") : "100%" }}
						>
							<Input
								disabled={!props.isEditionActive}
								value={author}
								style={styles.input}
								onChangeText={(newAuthor) => setAuthor(newAuthor)}
								onEndEditing={() => {
									props.book.setAuthor(author?.trim() || "");
									newStockBookViMo.updateDraft(props.book);
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
					backgroundColor: transparent,
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
							onPressIn={() => setRecent(!recent)}
							onPressOut={() => {
								props.book.setRecent(recent ? recent : false);
								newStockBookViMo.updateDraft(props.book);
							}}
						>
							{!props.isEditionActive ? (
								<Icon name="clock-outline" fill={recent ? "tomato" : "darkgray"} height="35" width="35" />
							) : (
								<Icon name="clock" fill={recent ? "tomato" : "darkgray"} height="35" width="35" />
							)}
						</TouchableOpacity>
					</Layout>
					<Layout style={{ width: "30%", alignItems: "center" }}>
						<Text style={{ fontSize: 10 }}>Más vendido</Text>
						<TouchableOpacity
							disabled={!props.isEditionActive}
							style={{ opacity: !props.isEditionActive ? 0.7 : 1 }}
							onPressIn={() => setBestSeller(!bestSeller)}
							onPressOut={() => {
								props.book.setBestSeller(bestSeller ? bestSeller : false);
								newStockBookViMo.updateDraft(props.book);
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
							onPressIn={() => setRecommended(!recommended)}
							onPressOut={() => {
								props.book.setRecommended(recommended ? recommended : false);
								newStockBookViMo.updateDraft(props.book);
							}}
						>
							{!props.isEditionActive ? (
								<Icon name="checkmark-circle-2-outline" fill={recommended ? "greenyellow" : "darkgray"} height="35" width="35" />
							) : (
								<Icon name="checkmark-circle-2" fill={recommended ? "greenyellow" : "darkgray"} height="35" width="35" />
							)}
						</TouchableOpacity>
					</Layout>
				</Layout>
				<Layout style={{ width: "10%", justifyContent: "center", alignItems: "flex-end" }}>
					<TouchableOpacity
						disabled={!props.isEditionActive}
						style={{ opacity: !props.isEditionActive ? 0.7 : 1 }}
						onPressIn={() => setVisible(!visible)}
						onPressOut={() => {
							props.book.setVisible(visible ? visible : false);
							newStockBookViMo.updateDraft(props.book);
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
				style={{ width: "70%" }}
				backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onBackdropPress={() => setModalVisibility(false)}
				children={modalChildren}
			/>
			<Layout style={{ flex: 4, flexDirection: "row" }}>
				<Layout
					style={{
						backgroundColor: transparent,
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
							onPressIn={() => setInOffer(!inOffer)}
							onPressOut={() => {
								props.book.setInOffer(inOffer);
								newStockBookViMo.updateDraft(props.book);
							}}
						/>
						<Toggle
							disabled={!props.isEditionActive}
							checked={hasIva}
							onPressIn={() => setHasIva(!hasIva)}
							onPressOut={() => {
								props.book.setHasIva(hasIva);
								newStockBookViMo.updateDraft(props.book);
							}}
						/>
					</Layout>
					<Layout style={{ width: "30%", height: "100%", justifyContent: "space-around" }}>
						<Text>Descuento</Text>
						<Text>IVA</Text>
					</Layout>
					<Layout style={{ width: "30%", height: "100%", justifyContent: "space-around", alignItems: "flex-start" }}>
						<Layout style={{ flexDirection: "row" }}>
							<Text style={{ textAlignVertical: "center" }}> % </Text>
							<Button
								disabled={!(props.isEditionActive && inOffer)}
								size="small"
								onPress={() => {
									setModalChildren(
										<ModalDiscount
											isEditionActive={props.isEditionActive}
											setModalVisibility={setModalVisibility}
											discountPercentage={discountPercentage || 1}
											setDiscountPercentage={setDiscountPercentage}
											book={props.book}
										/>,
									);
									setModalVisibility(true);
								}}
							>
								{inOffer ? discountPercentage || "1" : "0"}
							</Button>
						</Layout>
						<Layout style={{ flexDirection: "row" }}>
							<Text style={{ textAlignVertical: "center" }}> % </Text>
							<Button disabled={!(props.isEditionActive && hasIva)} size="small" status={!hasIva ? undefined : "danger"}>
								{hasIva ? "12" : "0"}
							</Button>
						</Layout>
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
										book={props.book}
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
						<Button
							disabled={!props.isEditionActive}
							size="small"
							onPress={() => {
								setModalChildren(
									<ModalStock
										isEditionActive={props.isEditionActive}
										setModalVisibility={setModalVisibility}
										stock={stock || 0}
										setStock={setStock}
										book={props.book}
									/>,
								);
								setModalVisibility(true);
							}}
						>
							{stock !== 0 ? stock : "0"}
						</Button>
						<Text style={{ textAlignVertical: "center", fontSize: 25 }}> 📦</Text>
					</Layout>
				</Layout>
			</Layout>
		</Layout>
	);
};
const ModalDiscount = (props: {
	isEditionActive: boolean;
	setModalVisibility: (value: boolean) => void;
	discountPercentage: number;
	setDiscountPercentage: (value: number) => void;
	book: StockBook;
}) => {
	const [percentage, setPercentage] = useState(props.discountPercentage);
	const [amount, setAmount] = useState(0);
	const price = props.book.getGrossPricePerUnit();

	const calcAmount = (price: number, percentage: number) => (percentage * price) / 100;

	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Layout style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
				<Text>Descuento de {percentage}% equivale a $ </Text>
				<Text style={{ textAlign: "left" }}>-{amount.toFixed(2)}</Text>
			</Layout>
			<Slider
				style={{ width: "100%", height: 40, marginVertical: 20 }}
				value={percentage}
				step={1}
				minimumValue={1}
				maximumValue={100}
				onValueChange={(value) => {
					setPercentage(Math.round(value));
					setAmount(calcAmount(price || 1, Math.round(percentage)));
				}}
			/>
			<Button
				size="small"
				style={{ width: "50%" }}
				onPressOut={() => {
					props.setDiscountPercentage(percentage);
					props.book.setDiscountPercentage(percentage);
					newStockBookViMo.updateDraft(props.book);
					props.setModalVisibility(false);
				}}
			>
				Confirmar
			</Button>
		</Layout>
	);
};
const ModalPrice = (props: {
	isEditionActive: boolean;
	setModalVisibility: (value: boolean) => void;
	grossPricePerUnit: number;
	setGrossPricePerUnit: (value: number) => void;
	book: StockBook;
}) => {
	const [parteEntera, setParteEntera] = useState(props.grossPricePerUnit.toFixed(2).split(".")[0]);
	const [parteDecimal, setParteDecimal] = useState(props.grossPricePerUnit.toFixed(2).split(".")[1]);

	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Layout style={{ flexDirection: "row", justifyContent: "center" }}>
				<Text style={{ width: "25%", textAlign: "right" }}>Precio $</Text>
				<Text style={{ width: "20%", textAlign: "right" }}>
					{parteEntera}.{parteDecimal}
				</Text>
			</Layout>
			<Layout style={{ flexDirection: "row", marginVertical: 20 }}>
				<Input
					selectTextOnFocus
					disabled={!props.isEditionActive}
					keyboardType="phone-pad"
					size="small"
					textAlign="center"
					cursorColor='black'
					defaultValue={parteEntera}
					value={parteEntera}
					onChangeText={(newInt) => {
						const regex = new RegExp("^\\d{0,3}$");
						if (!Number.isNaN(Number(newInt)) && regex.test(newInt)) setParteEntera(newInt);
					}}
				/>
				<Text style={{ textAlignVertical: "bottom" }}> . </Text>
				<Input
					selectTextOnFocus
					disabled={!props.isEditionActive}
					keyboardType="phone-pad"
					size="small"
					textAlign="center"
					cursorColor='black'
					defaultValue={parteDecimal}
					value={parteDecimal}
					onChangeText={(newFloat) => {
						const regex = new RegExp("^\\d{0,2}$");
						if (!Number.isNaN(Number(newFloat)) && regex.test(newFloat)) setParteDecimal(newFloat);
					}}
				/>
			</Layout>
			<Button
				size="small"
				style={{ width: "50%" }}
				onPress={() => {
					const price = Number(`${parteEntera}.${parteDecimal}`);
					if (!Number.isNaN(price)) {
						props.setGrossPricePerUnit(price);
						props.book.setGrossPricePerUnit(price);
						newStockBookViMo.updateDraft(props.book);
						props.setModalVisibility(false);
					}
				}}
			>
				Confirmar
			</Button>
		</Layout>
	);
};
const ModalStock = (props: {
	isEditionActive: boolean;
	setModalVisibility: (value: boolean) => void;
	stock: number;
	setStock: (value: number) => void;
	book: StockBook;
}) => {
	const [cant, setCant] = useState(props.stock.toFixed());

	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Layout style={{ flexDirection: "row", justifyContent: "center" }}>
				<Text style={{ textAlign: "right" }}>Cantidad de Artículos</Text>
				<Text style={{ width: "20%", textAlign: "center" }}>{Number(cant) !== 0 ? cant : "0"}</Text>
			</Layout>
			<Layout style={{ marginVertical: 20 }}>
				<Input
					selectTextOnFocus
					disabled={!props.isEditionActive}
					keyboardType="phone-pad"
					size="small"
					textAlign="center"
					cursorColor='black'
					defaultValue={cant}
					value={cant}
					onChangeText={(newCant) => {
						const regex = new RegExp("^\\d{0,4}$");
						if (!Number.isNaN(Number(newCant)) && regex.test(newCant)) setCant(newCant);
					}}
				/>
			</Layout>
			<Button
				size="small"
				style={{ width: "50%" }}
				onPress={() => {
					const parse = Number(cant);
					if (!Number.isNaN(parse)) {
						props.setStock(parse);
						props.book.setStock(parse);
						newStockBookViMo.updateDraft(props.book);
						props.setModalVisibility(false);
					}
				}}
			>
				Confirmar
			</Button>
		</Layout>
	);
};

const BookBottom = (props: { book: StockBook; isEditionActive: boolean }) => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();
	const [description, setDescription] = useState(props.book.getDescription());
	const createdDate = props.book.getCreatedDate();
	let dateSplitted;
	if (dateSplitted !== undefined) dateSplitted = createdDate?.split("T")[0].split("-");

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
						props.book.setDescription(description?.trim() || "");
						newStockBookViMo.updateDraft(props.book);
					}}
				/>
			</Layout>
			<Modal
				visible={modalVisibility}
				style={{ width: "70%" }}
				backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onBackdropPress={() => setModalVisibility(false)}
				children={modalChildren}
			/>
			<Layout style={[styles.common, { justifyContent: "space-around", alignItems: "center" }]}>
				<Button
					disabled={!props.isEditionActive}
					status={!props.isEditionActive ? "basic" : "success"}
					size="tiny"
					accessoryLeft={SaveIcon}
					style={{ width: "25%" }}
					onPress={() => {
						setModalChildren(<ModalSaveConfirmation setModalVisibility={setModalVisibility} setModalChildren={setModalChildren} />);
						setModalVisibility(true);
					}}
				/>
			</Layout>
			<Layout>
				<Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "right" }}>{`(Fecha de creación del registro: ${Intl.DateTimeFormat("ec", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}).format(
					dateSplitted !== undefined
						? new Date(Number.parseInt(dateSplitted[0]), Number.parseInt(dateSplitted[1]) - 1, Number.parseInt(dateSplitted[2]))
						: new Date(),
				)})`}</Text>
			</Layout>
		</Layout>
	);
};
const SaveIcon = () => <Icon name="save" fill="white" height="30" width="30" />;
const ModalSaveConfirmation = (props: {
	setModalVisibility: (value: boolean) => void;
	setModalChildren: (children: JSX.Element) => void;
}) => {
	const [percentage, setPercentage] = useState(1);
	const [buttonDisabled, setButtonDisabledState] = useState(true);

	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Text>Deslice para confirmar {percentage}%</Text>
			<Slider
				style={{ width: "100%", height: 40, marginVertical: 20 }}
				value={percentage}
				step={1}
				minimumValue={1}
				maximumValue={100}
				onValueChange={(newPercentage) => setPercentage(newPercentage)}
				onSlidingComplete={(currentPercentage) => (currentPercentage === 100 ? setButtonDisabledState(false) : setButtonDisabledState(true))}
			/>
			<Button
				disabled={buttonDisabled}
				size="small"
				status="success"
				style={{ width: "50%" }}
				onPress={async () => {
					const confirmation = await newStockBookViMo.saveDataToServer();
					if (confirmation === null) {
						props.setModalChildren(
							<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
								<Layout style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
									<Text style={{ textTransform: "uppercase" }}>La operación falló</Text>
									<Icon name="alert-circle-outline" fill="darkred" height="30" width="30" />
									<Text style={{ fontSize: 10, marginVertical: 5 }}>(Contacte a soporte técnico o intente más tarde)</Text>
								</Layout>
								<Button size="small" status="danger" style={{ width: "50%", marginTop: 10 }} onPress={() => props.setModalVisibility(false)}>
									Ok
								</Button>
							</Layout>,
						);
						return;
					}
					if (!confirmation) {
						props.setModalChildren(
							<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
								<Layout style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
									<Text style={{ textTransform: "uppercase" }}>Registro no creado</Text>
									<Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />
									<Text style={{ fontSize: 12, marginVertical: 5 }}>(Verifique que los datos sean correctos)</Text>
								</Layout>
								<Button size="small" status="info" style={{ width: "50%", marginTop: 10 }} onPress={() => props.setModalVisibility(false)}>
									Ok
								</Button>
							</Layout>,
						);
					} else {
						props.setModalChildren(
							<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
								<Layout style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
									<Text style={{ textTransform: "uppercase" }}>Registro Creado</Text>
									<Icon name="checkmark-circle-outline" fill="darkgreen" height="30" width="30" />
									<Text style={{ fontSize: 12, marginVertical: 5 }}>(Se redireccionará al Inicio)</Text>
								</Layout>
								<Button size="small" status="success" style={{ width: "50%", marginTop: 10 }} onPress={() => props.setModalVisibility(false)}>
									Ok
								</Button>
							</Layout>,
						);
					}
				}}
			>
				Confirmar
			</Button>
		</Layout>
	);
};

const NewStockBookScreen = () => {
	const [book, setBook] = useState(new StockBook());
	const [isEditionActive, setEditionState] = useState(true);
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<StockBookScreenProps>();

	const updateState: NewStockBookObserver = (stockBookDraft: StockBook, isEditingActive: boolean, pop: boolean) => {
		setBook(stockBookDraft);
		setEditionState(isEditingActive);
		if (pop) navigation.popToTop();
	};

	useEffect(() => {}, [book]);

	useEffect(() => {
		const date = new Date().toLocaleDateString().split("/");
		book.setReleaseDate(`${date[0]}/${date[1]}/${date[2]}`);
		book.setDiscountPercentage(0);
		book.setVisible(false);
		book.setRecommended(false);
		book.setBestSeller(false);
		book.setRecent(false);
		book.setInOffer(false);
		book.setHasIva(false);
		newStockBookViMo.attach(updateState);
		return () => newStockBookViMo.detach();
	}, []);

	return (
		<Layout style={[styles.common, styles.container]}>
			<HeaderComponent />
			<BodyComponent book={book} isEditionActive={isEditionActive} />
		</Layout>
	);
};

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		textAlign: "center",
	},
	container: { flex: 1, paddingTop: 10 },
	header: {
		backgroundColor: "black",
		zIndex: 0,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		color: "white",
	},
	body: { flex: 9, width: "100%" },
	bodyTop: { zIndex: 1, flex: 6, backgroundColor: transparent, padding: 5 },
	bodyMiddle: { zIndex: 0, flex: 3, backgroundColor: transparent, padding: 5 },
	bodyBottom: { zIndex: 1, flex: 6, backgroundColor: transparent, justifyContent: "space-around", padding: 5 },
	topLeftPanel: {
		backgroundColor: "gainsboro",
		width: "35%",
		height: 250,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		marginHorizontal: 5,
	},
	topRightPanel: { backgroundColor: transparent, width: "60%", height: 250, justifyContent: "space-around" },
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
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderWidth: 1,
		borderBottomWidth: 2,
		borderColor: "darkgrey",
	},
	image: {
		maxWidth: "80%",
		maxHeight: 120,
		resizeMode: "contain",
	},
});

export default NewStockBookScreen;
