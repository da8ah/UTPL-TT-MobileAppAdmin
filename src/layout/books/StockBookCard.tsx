import { Button, ButtonGroup, Icon, Layout, Text } from "@ui-kitten/components";
import { Image, StyleSheet } from "react-native";

const hasDis = true;
const title = "Title";
const isbn = "1234";
const author = "Author";

const StockBookCard = () => {
	return (
		<Layout style={styles.mainLayout}>
			{/* Card */}
			<Layout style={styles.cardLayout}>
				<Layout style={[styles.common, styles.cardHeader]}>
					{/* <Layout style={{ marginLeft: 1 }}> */}
					<Icon name="eye" fill="darkgray" height="25" width="25" />
					{/* </Layout> */}
					{/* <Layout style={{ alignContent: "flex-end" }}> */}
					<Text style={{ color: "red" }}>{hasDis ? "-100%" : "No"}</Text>
					{/* </Layout> */}
				</Layout>
				<Layout style={styles.cardStatus}>
					<Layout style={styles.icons}>
						<Icon name="checkmark-circle-2" fill="darkgray" height="30" width="30" />
						<Icon name="star" fill="darkgray" height="30" width="30" />
						<Icon name="clock" fill="darkgray" height="30" width="30" />
					</Layout>
					<Layout style={styles.imageLayout}>
						<Image style={styles.image} source={require("../../../assets/icon.png")} />
					</Layout>
				</Layout>
				<Layout style={styles.cardBody}>
					<Text>{title}</Text>
					<Text>{isbn}</Text>
					<Text>{author}</Text>
				</Layout>
			</Layout>
			{/* Button */}
			<Layout style={[styles.common, styles.buttonLayout]}>
				<Button style={styles.button} size="small">
					EDITAR
				</Button>
			</Layout>
		</Layout>
	);
};

const bc = "transparent";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	mainLayout: {
		backgroundColor: "black",
		width: "45%",
		height: 300,
		marginTop: 10,
	},
	cardLayout: {
		backgroundColor: "white",
		width: "100%",
		height: 250,
		paddingVertical: 5,
		borderRadius: 20,
	},
	cardHeader: {
		backgroundColor: "black",
		width: "100%",
		height: 30,
		paddingHorizontal: 3,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardStatus: {
		backgroundColor: "gray",
		width: "100%",
		height: 130,
		flexDirection: "row",
	},
	icons: {
		width: "20%",
	},
	imageLayout: {
		width: "80%",
		alignContent: "center",
	},
	image: {
		maxWidth: "80%",
		height: 130,
		resizeMode: "contain",
	},
	cardBody: {
		backgroundColor: "orange",
		width: "100%",
		height: 60,
	},
	buttonLayout: {
		height: 50,
	},
	button: {
		width: "90%",
	},
});

export default StockBookCard;
