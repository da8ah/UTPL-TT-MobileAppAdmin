import { Layout, Text } from "@ui-kitten/components";
import { ReactElement } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const HeaderComponent = () => {
	return (
		<Layout style={[styles.common, styles.header]}>
			<Text category='h3' status='primary'>
				BOOKSTORE
			</Text>
			<Text category="h5" status="primary" style={{ fontStyle: "italic", color: "white" }}>
				Manager
			</Text>
		</Layout>
	);
};

const BodyComponent = (props: { children?: ReactElement }) => {
	return <Layout style={styles.body}>{props.children}</Layout>;
};

function MainFrameScreen(props: { children?: ReactElement }) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Layout testID='home' style={styles.container}>
				<HeaderComponent />
				<BodyComponent children={props.children} />
			</Layout>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	container: {
		flex: 1,
	},
	header: {
		flex: 3,
		paddingVertical: 20,
		color: "white",
		backgroundColor: "black",
	},
	body: {
		flex: 20,
	},
});

export default MainFrameScreen;
