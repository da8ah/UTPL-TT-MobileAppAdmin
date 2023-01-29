import { Layout, Text } from "@ui-kitten/components";
import { lazy, Suspense, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import LoginScreen from "../auth/LoginScreen";

const LoadingAlert = () => (
	<Layout style={styles.container}>
		<Text status='warning' appearance='hint'>
			Loading...
		</Text>
		<ActivityIndicator />
	</Layout>
);

const MainNavigator = lazy(() => import("./MainNavigator"));

const AuthNavigator = () => {
	const [isAuth, setAuth] = useState<boolean>(true);

	return !isAuth ? (
		<LoginScreen />
	) : (
		<Suspense fallback={<LoadingAlert />}>
			<MainNavigator />
		</Suspense>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default AuthNavigator;
