import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const { Navigator, Screen } = createNativeStackNavigator();

const TransactionDetailsNav = () => (
	<Navigator>
		<Screen name='TransactionDetails' component={TransactionDetails} />
	</Navigator>
);

const TransactionDetails = () => {
	return (
		<Layout style={[styles.common, styles.mainLayout]}>
			<Text>Hola Mundo</Text>
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
	mainLayout: {
		backgroundColor: "white",
		flex: 1,
		position: "absolute",
	},
});

export default TransactionDetails;
