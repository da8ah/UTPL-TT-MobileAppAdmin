import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
	MainTabs: undefined;
	NewStockBook: undefined;
	StockBook: { bookIndex: number };
};

export type NewStockBookScreenProps = NativeStackScreenProps<RootStackParamList, "NewStockBook">;
export type StockBookScreenProps = NativeStackScreenProps<RootStackParamList, "StockBook">;
