import { useNavigation } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { NewStockBookScreenProps, StockBookScreenProps } from "../../ScreenTypes";

const AddButtonOverlay = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<NewStockBookScreenProps>();

	return (
		<TouchableOpacity
			style={{ backgroundColor: "transparent", position: "absolute", alignSelf: "flex-end", top: 530, right: 10, width: 70, height: 70 }}
			onPress={() => navigation.navigate("NewStockBook")}
		>
			<Icon name="plus-circle" fill="black" height="70" width="70" />
		</TouchableOpacity>
	);
};

export default AddButtonOverlay;
