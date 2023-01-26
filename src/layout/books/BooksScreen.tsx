import { Layout, List } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import booksViMo, { BooksObserver } from "../../viewmodel/BooksViMo";
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
	const [books, setBooks] = useState<StockBook[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const displayDataRetrieved: BooksObserver = (books: StockBook[]) => {
		setBooks(books);
	};

	const queryDataFromServer = () => {
		setRefreshing(true);
		setTimeout(async () => {
			await booksViMo.getDataFromServer();
			setBooks(booksViMo.getBooksStored());
			setRefreshing(false);
		}, 2000);
	};

	useEffect(() => {
		queryDataFromServer();
		booksViMo.attach(displayDataRetrieved);
		return () => booksViMo.detach();
	}, []);

	return (
		<Layout style={styles.booksLayout}>
			<List
				scrollEnabled
				// testID='listBooks'
				listKey={"books"}
				style={styles.mainListLayout}
				contentContainerStyle={styles.flatListLayout}
				columnWrapperStyle={styles.columnsStyle}
				numColumns={2}
				initialNumToRender={5}
				data={books}
				extraData={books}
				renderItem={StockBookCard}
				refreshing={refreshing}
				onRefresh={queryDataFromServer}
			/>
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
	searchBarLayout: { flex: 1, paddingVertical: 20 },
	booksLayout: { flex: 9 },
	mainListLayout: { flex: 1 },
	flatListLayout: {},
	columnsStyle: { alignContent: "center" },
});

export default BooksScreen;

// const observer = new IntersectionObserver((entry) => {});
