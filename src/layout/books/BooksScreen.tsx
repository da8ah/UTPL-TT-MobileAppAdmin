import { Layout, List } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import viMoBooks from "../../viewmodel/ViMoBooks";
import SearchBar from "./SearchBar";
import StockBookCard from "./StockBookCard";

const SearchBarLayout = () => {
	return (
		<Layout style={[styles.common, styles.searchBarLayout]}>
			<SearchBar />
		</Layout>
	);
};

const BooksLayout = (props: { books: StockBook[] }) => {
	return (
		<Layout style={styles.booksLayout}>
			<List
				// testID='listBooks'
				style={{ flex: 1 }}
				contentContainerStyle={styles.bookFrameLayout}
				data={props.books}
				extraData={props.books}
				renderItem={StockBookCard}
				listKey={"books"}
				// refreshing={refreshing}
				// onRefresh={queryDataFromServer}
			/>
		</Layout>
	);
};

const BooksScreen = () => {
	loadDataFromServer();
	const books = viMoBooks.getBooksStored();

	return (
		<Layout style={{ flex: 1 }}>
			<SearchBarLayout />
			<BooksLayout books={books} />
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
		flex: 9,
	},
	bookFrameLayout: {
		backgroundColor: "black",
		flex: 1,
	},
});

export default BooksScreen;

const loadDataFromServer = async function () {
	setTimeout(async () => {
		await viMoBooks.getDataFromServer();
	}, 2000);
};
