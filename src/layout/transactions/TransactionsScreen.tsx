import { Layout, List } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import CardTransaction from "../../core/entities/CardTransaction";
import transactionsViMo, { TransactionsObserver } from "../../viewmodel/TransactionsViMo";
import TransactionCard from "./TransactionCard";

// const SearchBarLayout = () => {
// 	return (
// 		<Layout style={[styles.common, styles.searchBarLayout]}>
// 			<SearchBar />
// 		</Layout>
// 	);
// };

const TransactionsLayout = () => {
	const [transactions, setTransactions] = useState<CardTransaction[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const displayDataRetrieved: TransactionsObserver = (transactions: CardTransaction[]) => {
		setTransactions(transactions);
	};

	const queryDataFromServer = () => {
		setRefreshing(true);
		setTimeout(async () => {
			await transactionsViMo.getDataFromServer();
			setTransactions(transactionsViMo.getTransactionsStored().reverse());
			setRefreshing(false);
		}, 2000);
	};

	useEffect(() => {
		queryDataFromServer();
		transactionsViMo.attach(displayDataRetrieved);
		return () => transactionsViMo.detach();
	}, []);

	return (
		<Layout style={styles.transactionsLayout}>
			<List
				scrollEnabled
				// testID='listTransactions'
				listKey={"transactions"}
				style={styles.mainListLayout}
				contentContainerStyle={styles.flatListLayout}
				initialNumToRender={5}
				data={transactions}
				extraData={transactions}
				renderItem={TransactionCard}
				refreshing={refreshing}
				onRefresh={queryDataFromServer}
			/>
		</Layout>
	);
};

const TransactionsScreen = () => {
	return (
		<Layout style={{ flex: 1 }}>
			{/* <SearchBarLayout /> */}
			<TransactionsLayout />
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
	// searchBarLayout: { flex: 1, paddingVertical: 20 },
	transactionsLayout: { flex: 1 },
	mainListLayout: { backgroundColor: "gainsboro", flex: 1 },
	flatListLayout: { backgroundColor: "transparent" },
});

export default TransactionsScreen;

// const observer = new IntersectionObserver((entry) => {});
