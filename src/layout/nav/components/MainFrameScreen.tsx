import { Layout, Text } from "@ui-kitten/components";
import { ReactElement } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const HeaderComponent = () => (
	<Layout style={[styles.common, styles.header]}>
		<Text category='h1' style={{ color: "white", fontFamily: "serif" }}>
			BOOKSTORE
		</Text>
		<Text category="h5" status="primary" style={{ fontStyle: "italic" }}>
			MANAGER
		</Text>
	</Layout>
);

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
		justifyContent: "flex-end",
		paddingVertical: 20,
		color: "white",
		backgroundColor: "black",
	},
	body: {
		flex: 20,
	},
});

export default MainFrameScreen;
