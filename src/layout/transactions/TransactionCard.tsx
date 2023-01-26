import { Button, Divider, Icon, Layout, Text } from "@ui-kitten/components";
import { ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import CardTransaction from "../../core/entities/CardTransaction";
import Cart from "../../core/entities/Cart";
import TransactionDetails from "./TransactionDetails";
import TransactionDetailsNav from "./TransactionDetails";

const TransactionCardHeader = (props: { id?: string }) => (
	<Layout style={[styles.transparentBackground, styles.cardHeader]}>
		<Layout style={styles.transparentBackground}>
			<Text style={{ fontWeight: "bold" }}>
				Tipo: <Text style={{ fontStyle: "italic" }}>Card</Text>
			</Text>
			<Text style={{ fontWeight: "bold" }}>
				ID: <Text style={{ fontSize: 11 }}>{props.id}</Text>
			</Text>
		</Layout>
		<TouchableOpacity>
			<Text style={{ fontSize: 50, textAlign: "center" }} allowFontScaling adjustsFontSizeToFit>
				💳
			</Text>
		</TouchableOpacity>
	</Layout>
);

const TransactionCardLateral = (props: { user?: string; cant?: number }) => (
	<Layout style={[styles.transparentBackground, styles.lateralLayout]}>
		<Layout style={[styles.transparentBackground, styles.client]}>
			<TouchableOpacity>
				<Text style={{ fontSize: 50, textAlign: "center" }} allowFontScaling adjustsFontSizeToFit>
					😃
				</Text>
			</TouchableOpacity>
			<ScrollView
				horizontal
				alwaysBounceHorizontal
				style={{ width: "90%", height: 20, marginHorizontal: "10%" }}
				contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				fadingEdgeLength={50}
			>
				<Text style={{ fontSize: 16, textAlign: "center" }} allowFontScaling>
					{props.user}
				</Text>
			</ScrollView>
		</Layout>
		<Layout style={styles.transparentBackground}>
			<Layout style={[styles.transparentBackground, { flexDirection: "row", justifyContent: "flex-end" }]}>
				<Text style={{ fontSize: 20, textAlign: "center" }} allowFontScaling adjustsFontSizeToFit>
					{props.cant}
				</Text>
				<TouchableOpacity>
					<Text style={{ fontSize: 40, textAlign: "center" }} allowFontScaling adjustsFontSizeToFit>
						🛒
					</Text>
				</TouchableOpacity>
			</Layout>
		</Layout>
	</Layout>
);

const TransactionCardBody = (props: { discountCalc?: number; ivaCalc?: number; totalPrice?: number }) => (
	<Layout style={[styles.transparentBackground, styles.cardBody]}>
		<Layout style={[styles.transparentBackground, styles.bodyProperties]}>
			<Text style={{ fontStyle: "italic" }}>Descuento</Text>
			<Text style={{ color: "darkgreen", fontWeight: "bold" }}>{`- $${props.discountCalc?.toFixed(2)}`}</Text>
		</Layout>
		<Layout style={[styles.transparentBackground, styles.bodyProperties]}>
			<Text style={{ fontStyle: "italic" }}>IVA</Text>
			<Text style={{ color: "darkred", fontWeight: "bold" }}>{`+ $${props.ivaCalc?.toFixed(2)}`}</Text>
		</Layout>
		<Layout style={[styles.transparentBackground, styles.bodyProperties]}>
			<Text style={{ fontWeight: "bold" }}>Total</Text>
			<Text style={{ fontWeight: "bold" }}>{`$${props.totalPrice?.toFixed(2)}`}</Text>
		</Layout>
	</Layout>
);

const buttonIcon = () => <Icon name="layers" fill="white" height="15" width="15" />;
const TransactionCardButton = () => (
	<Layout style={[styles.transparentBackground, styles.common, styles.buttonLayout]}>
		<Button style={styles.button} size="small" status="info" accessoryLeft={buttonIcon} onPressOut={() => <TransactionDetails />}>
			Abrir
		</Button>
	</Layout>
);

const TransactionCard: ListRenderItem<CardTransaction> = (info: ListRenderItemInfo<CardTransaction>) => {
	const calcCant = (cart: Cart | undefined): number => {
		if (cart !== undefined) {
			const books = cart.getToBuyBooks();
			if (books !== undefined) {
				let cant = 0;
				books.map((book) => {
					if (book.getCant() !== undefined) cant = cant + (book.getCant() || 0);
				});
				return cant;
			}
		}
		return NaN;
	};

	return (
		<Layout style={styles.mainLayout}>
			{/* Card */}
			<Layout style={[styles.transparentBackground, styles.mainPanel]}>
				<Layout style={[styles.transparentBackground, styles.internalPanel]}>
					<TransactionCardHeader id={info.item.getId()} />
					<Divider />
					<TransactionCardBody
						discountCalc={info.item.getCart()?.getDiscountCalc()}
						ivaCalc={info.item.getCart()?.getIvaCalc()}
						totalPrice={info.item.getCart()?.getTotalPrice()}
					/>
				</Layout>
				<TransactionCardLateral user={"Tiber"} cant={calcCant(info.item.getCart())} />
			</Layout>
			{/* Button */}
			<Divider />
			<TransactionCardButton />
		</Layout>
	);
};

const transparent = "transparent";

const styles = StyleSheet.create({
	transparentBackground: { backgroundColor: transparent },
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	mainLayout: {
		backgroundColor: "white",
		height: 250,
		margin: 10,
		borderRadius: 7,
		justifyContent: "space-between",
	},
	mainLayoutDisplay: {
		display: "none",
	},
	mainPanel: {
		width: "100%",
		height: 200,
		flexDirection: "row",
	},
	internalPanel: { width: "80%", maxHeight: 200, paddingLeft: 2 },
	lateralLayout: { width: "20%", justifyContent: "space-between", paddingRight: 2 },
	cardHeader: {
		height: 70,
		paddingTop: 3,
		paddingHorizontal: 3,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardBody: {
		width: "60%",
		height: 130,
		paddingHorizontal: 2,
		justifyContent: "space-around",
	},
	bodyProperties: {
		paddingHorizontal: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	client: {
		borderRadius: 5,
		paddingVertical: 10,
		alignItems: "center",
	},
	buttonLayout: {
		height: 50,
		alignContent: "center",
	},
	button: { width: "30%", borderRadius: 20 },
});

export default TransactionCard;
