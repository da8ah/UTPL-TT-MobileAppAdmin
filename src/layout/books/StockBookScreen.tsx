import {
	Button,
	ButtonGroup,
	Datepicker,
	DateService,
	I18nConfig,
	Icon,
	Input,
	Layout,
	NativeDateService,
	Text,
	Toggle,
} from "@ui-kitten/components";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity } from "react-native";
import StockBook from "../../core/entities/StockBook";
import { StockBookScreenProps } from "../ScreenTypes";

const HeaderComponent = () => (
	<Layout style={[styles.common, styles.header, { zIndex: 0 }]}>
		<Icon name="book" fill="white" height="50" width="50" />
		<Text category='h2' style={{ color: "white", fontFamily: "serif" }}>
			Artículo en Stock
		</Text>
	</Layout>
);

const BodyComponent = (props: { book: StockBook }) => (
	<Layout style={styles.body}>
		<BookTop
			releaseDate={props.book.getReleaseDate()}
			title={props.book.getTitle()}
			isbn={props.book.getIsbn()}
			author={props.book.getAuthor()}
			imgRef={props.book.getImgRef()}
			description={props.book.getDescription()}
		/>
		<BookMiddle
			recommended={props.book.isRecommended()}
			bestSeller={props.book.isBestSeller()}
			recent={props.book.isRecent()}
			visible={props.book.isVisible()}
			inOffer={props.book.isInOffer()}
			discountPercentage={props.book.getDiscountPercentage()}
			hasIva={props.book.itHasIva()}
			ivaPercentage={props.book.getIvaPercentage()}
			grossPricePerUnit={props.book.getGrossPricePerUnit()}
			stock={props.book.getStock()}
		/>
		<BookBottom description={props.book.getDescription()} createdDate={props.book.getCreatedDate()} />
	</Layout>
);

const useDatepickerState = (initialDate: Date = new Date()) => {
	const [date, setDate] = useState<Date>(initialDate);
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

const localeDateService = new NativeDateService("ec", { i18n, startDayOfWeek: 1 });

const DatepickerIcon = () => <Icon name="calendar" fill="black" height="10" width="10" />;
const BookTop = (props: { releaseDate?: string; title?: string; isbn?: string; author?: string; imgRef?: string; description?: string }) => {
	const localePickerState = useDatepickerState();
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
					accessoryLeft={DatepickerIcon}
					size="small"
					// date={props.releaseDate || new Date()}
					initialVisibleDate={new Date()}
					min={new Date(1899, 12, 1)}
					dateService={localeDateService}
					{...localePickerState}
				/>
			</Layout>
			<Layout style={{ flexDirection: "row" }}>
				<Layout style={styles.topLeftPanel}>
					<Image style={styles.image} source={props.imgRef || require("../../../assets/bookstore.png")} />
				</Layout>
				<Layout style={[styles.common, styles.topRightPanel]}>
					<Layout style={styles.inputLayout}>
						<Layout style={styles.inputTitle}>
							<Text adjustsFontSizeToFit>Título</Text>
						</Layout>
						<Input value={props.title} selectionColor='black' style={styles.input} />
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={styles.inputTitle}>
							<Text adjustsFontSizeToFit>ISBN</Text>
						</Layout>
						<Input value={props.isbn} selectionColor='black' style={styles.input} />
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={styles.inputTitle}>
							<Text adjustsFontSizeToFit>Autor</Text>
						</Layout>
						<Input value={props.author} selectionColor='black' style={styles.input} />
					</Layout>
				</Layout>
			</Layout>
		</Layout>
	);
};

const BookMiddle = (props: {
	recommended?: boolean;
	bestSeller?: boolean;
	recent?: boolean;
	visible?: boolean;
	inOffer?: boolean;
	discountPercentage?: number;
	hasIva?: boolean;
	ivaPercentage?: number;
	grossPricePerUnit?: number;
	stock?: number;
}) => (
	<Layout style={[styles.common, styles.bodyMiddle]}>
		<Layout
			style={{
				backgroundColor: "gray",
				flexDirection: "row",
				justifyContent: "space-between",
				marginHorizontal: 5,
				padding: 5,
				borderRadius: 5,
			}}
		>
			<Layout style={{ width: "10%" }}>{}</Layout>
			<Layout style={{ width: "70%", flexDirection: "row", justifyContent: "space-around" }}>
				<TouchableOpacity>
					{props.recent ? <Icon name="clock" fill="darkred" height="35" width="35" /> : <Icon name="clock" fill="darkgray" height="30" width="30" />}
				</TouchableOpacity>
				<TouchableOpacity>
					{props.bestSeller ? <Icon name="star" fill="gold" height="35" width="35" /> : <Icon name="star" fill="darkgray" height="30" width="30" />}
				</TouchableOpacity>
				<TouchableOpacity>
					{props.recommended ? (
						<Icon name="checkmark-circle-2" fill="darkgreen" height="35" width="35" />
					) : (
						<Icon name="checkmark-circle-2" fill="darkgray" height="30" width="30" />
					)}
				</TouchableOpacity>
			</Layout>
			<Layout style={{ width: "10%", alignItems: "flex-end" }}>
				<TouchableOpacity>
					{props.visible ? <Icon name="eye" fill="black" height="35" width="35" /> : <Icon name="eye-off" fill="darkgray" height="35" width="35" />}
				</TouchableOpacity>
			</Layout>
		</Layout>
		<Layout style={{ flexDirection: "row" }}>
			<Layout style={{ width: "70%", flexDirection: "row", justifyContent: "space-around" }}>
				<Layout style={{ width: "30%" }}>
					<Text>Descuento</Text>
					<Text>IVA</Text>
				</Layout>
				<Layout style={{ width: "30%" }}>
					<Text>{props.discountPercentage}</Text>
					<Text>{props.ivaPercentage}</Text>
				</Layout>
				<Layout style={{ width: "30%" }}>
					<Toggle checked={props.inOffer} />
					<Toggle checked={props.hasIva} />
				</Layout>
			</Layout>
			<Layout style={{ width: "30%", justifyContent: "space-around", alignItems: "flex-end" }}>
				<Text>{props.grossPricePerUnit || ""} 💲</Text>
				<Text>{props.stock || ""} 📦</Text>
			</Layout>
		</Layout>
	</Layout>
);

const BookBottom = (props: { description?: string; createdDate?: string }) => (
	<Layout style={[styles.common, styles.bodyBottom]}>
		<Layout>
			<Layout style={styles.inputTitle}>
				<Text adjustsFontSizeToFit>Descripción</Text>
			</Layout>
			<Input
				multiline
				placeholder={props.description || "\n\n\n\n"}
				selectionColor='black'
				style={[
					styles.input,
					{
						borderColor: "darkgrey",
						borderWidth: 1,
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
					},
				]}
			/>
		</Layout>
		<Layout style={[styles.common, { flexDirection: "row", justifyContent: "space-around", alignItems: "center" }]}>
			<Button status="warning" size="tiny" accessoryLeft={EditIcon} style={{ width: "30%" }} />
			<Button status="basic" size="tiny" accessoryLeft={SlashIcon} style={{ width: "30%" }} />
			<Button status="basic" size="tiny" accessoryLeft={SaveIcon} style={{ width: "30%" }} />
		</Layout>
		<Layout>
			<Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "right" }}>{`Fecha de creación del registro: ${props.createdDate}`}</Text>
		</Layout>
	</Layout>
);
const EditIcon = () => <Icon name="edit" fill="white" height="30" width="30" />;
const SlashIcon = () => <Icon name="slash" fill="white" height="30" width="30" />;
const SaveIcon = () => <Icon name="save" fill="white" height="30" width="30" />;

const StockBookScreen = ({ route }: StockBookScreenProps) => {
	return (
		<Layout style={[styles.common, styles.container]}>
			<HeaderComponent />
			<BodyComponent book={new StockBook()} />
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
