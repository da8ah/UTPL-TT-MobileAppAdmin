import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { Image, ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet } from "react-native";
import StockBook from "../../../core/entities/StockBook";
import { StockBookScreenProps } from "../../ScreenTypes";

const StockBookCardHeader = (props: { isVisible?: boolean; isInOffer?: boolean; discountPercentage?: number }) => {
	return (
		<Layout style={[styles.common, styles.cardHeader]}>
			{/* <Layout style={{ marginLeft: 1 }}> */}
			{props.isVisible ? (
				<Icon name="eye" fill="dodgerblue" height="30" width="30" />
			) : (
				<Icon name="eye-off" fill="darkgray" height="25" width="25" />
			)}
			{/* </Layout> */}
			<Text style={{ color: "red", fontStyle: "italic" }}>{props.isInOffer ? `-${props.discountPercentage}%` : ""}</Text>
		</Layout>
	);
};

const StockBookCardStatus = (props: { isRecommended?: boolean; isBestSeller?: boolean; isRecent?: boolean }) => {
	return (
		<Layout style={styles.cardStatus}>
			<Layout style={styles.icons}>
				<Icon name="checkmark-circle-2" fill={!props.isRecommended ? "darkgray" : "greenyellow"} height="30" width="30" />
				<Icon name="star" fill={!props.isBestSeller ? "darkgray" : "gold"} height="30" width="30" />
				<Icon name="clock" fill={!props.isRecent ? "darkgray" : "tomato"} height="30" width="30" />
			</Layout>
			<Layout style={styles.imageLayout}>
				<Image style={styles.image} source={require("../../../../assets/bookstore.png")} />
			</Layout>
		</Layout>
	);
};

const StockBookCardBody = (props: { title?: string; isbn?: string; author?: string; price?: number; stock?: number }) => {
	return (
		<Layout style={styles.cardBody}>
			<ScrollView
				horizontal
				alwaysBounceHorizontal
				style={{ height: 20 }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				fadingEdgeLength={50}
			>
				<Text style={{ fontStyle: "italic" }}>{props.title}</Text>
			</ScrollView>
			<Layout style={[styles.common, styles.bodyProperties]}>
				<Text style={{ fontSize: 10 }} adjustsFontSizeToFit={true}>
					{props.isbn}
				</Text>
				<Text style={{ fontSize: 12.5 }} adjustsFontSizeToFit={true}>
					{props.price ? props.price.toFixed(2) : "NaN"} 💲
				</Text>
			</Layout>
			<Layout style={[styles.common, styles.bodyProperties]}>
				<ScrollView
					horizontal
					alwaysBounceHorizontal
					style={{ height: 20 }}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					fadingEdgeLength={50}
				>
					<Text style={{ fontSize: 11 }} adjustsFontSizeToFit={true}>
						{props.author}
					</Text>
				</ScrollView>
				<Layout style={{ backgroundColor: `${transparent}` }}>
					<Text adjustsFontSizeToFit={true}> {props.stock ? props.stock : "NaN"} 📦</Text>
				</Layout>
			</Layout>
		</Layout>
	);
};

const ButtonIcon = () => <Icon name="settings" fill="white" height="15" width="15" />;
const StockBookCardButton = (props: { itemIndex: number }) => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<StockBookScreenProps>();

	return (
		<Layout style={[styles.common, styles.buttonLayout]}>
			<Button
				style={styles.button}
				size="small"
				status="info"
				accessoryLeft={ButtonIcon}
				onPress={() => navigation.navigate("StockBook", { bookIndex: props.itemIndex })}
			>
				EDITAR
			</Button>
		</Layout>
	);
};

const StockBookCard: ListRenderItem<StockBook> = (info: ListRenderItemInfo<StockBook>) => {
	return (
		<Layout style={styles.mainLayout}>
			{/* Card */}
			<Layout style={styles.cardLayout}>
				<StockBookCardHeader
					isVisible={info.item.isVisible()}
					isInOffer={info.item.isInOffer()}
					discountPercentage={info.item.getDiscountPercentage()}
				/>
				<StockBookCardStatus isRecommended={info.item.isRecommended()} isBestSeller={info.item.isBestSeller()} isRecent={info.item.isRecent()} />
				<StockBookCardBody
					title={info.item.getTitle()}
					isbn={info.item.getIsbn()}
					author={info.item.getAuthor()}
					price={info.item.getGrossPricePerUnit()}
					stock={info.item.getStock()}
				/>
			</Layout>
			{/* Button */}
			<StockBookCardButton itemIndex={info.index} />
		</Layout>
	);
};

const transparent = "transparent";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	mainLayout: {
		backgroundColor: transparent,
		width: "45%",
		height: 300,
		margin: 10,
	},
	mainLayoutDisplay: {
		display: "none",
	},
	cardLayout: {
		backgroundColor: "gainsboro",
		width: "100%",
		height: 250,
		paddingVertical: 5,
		borderRadius: 7,
	},
	cardHeader: {
		backgroundColor: transparent,
		width: "100%",
		height: 30,
		paddingHorizontal: 3,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardStatus: {
		width: "100%",
		height: 140,
		flexDirection: "row",
	},
	icons: { width: "20%", justifyContent: "space-evenly" },
	imageLayout: { width: "80%", alignContent: "center" },
	image: {
		maxWidth: "80%",
		height: 140,
		resizeMode: "contain",
	},
	cardBody: {
		backgroundColor: transparent,
		width: "100%",
		height: 60,
		paddingHorizontal: 2,
	},
	bodyProperties: {
		backgroundColor: transparent,
		paddingHorizontal: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	buttonLayout: {
		backgroundColor: transparent,
		height: 50,
	},
	button: { width: "90%" },
});

export default StockBookCard;
