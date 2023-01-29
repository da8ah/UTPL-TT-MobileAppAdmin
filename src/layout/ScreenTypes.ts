import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
	MainTabs: undefined;
	StockBook: { bookid: number };
};

export type StockBookScreenProps = NativeStackScreenProps<RootStackParamList, "StockBook">;
