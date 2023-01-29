import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
	MainTabs: undefined;
	StockBook: { bookIndex: number };
};

export type StockBookScreenProps = NativeStackScreenProps<RootStackParamList, "StockBook">;
