import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import MainFrameScreen from "../MainFrameScreen";
import SearchBar from "./SearchBar";
import StockBookCard from "./StockBookCard";

const SearchBarLayout = () => {
	return (
		<Layout style={[styles.common, styles.searchBarLayout]}>
			<SearchBar />
		</Layout>
	);
};

const BooksLayout = () => {
	return (
		<Layout style={styles.booksLayout}>
			<StockBookCard />
			<StockBookCard />
		</Layout>
	);
};

const BooksScreen = () => {
	return (
		<Layout style={{ flex: 1 }}>
			<SearchBarLayout />
			<BooksLayout />
		</Layout>
	);
};

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	searchBarLayout: {
		flex: 1,
		paddingVertical: 20,
	},
	booksLayout: {
		backgroundColor: "blue",
		flex: 9,
		flexDirection: "row",
		justifyContent: "space-around",
	},
});

export default BooksScreen;
