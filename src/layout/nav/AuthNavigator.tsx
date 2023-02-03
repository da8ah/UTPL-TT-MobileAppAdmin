import { Layout, Text } from "@ui-kitten/components";
import { lazy, Suspense, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import adminViMo from "../../viewmodel/AdminViMo";
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
	const [isAuth, setAuth] = useState<boolean>(false);

	const tryLogin = async () => {
		await adminViMo.login();
	};

	useEffect(() => {
		tryLogin();
		if (adminViMo.getAdmin()?.getUser()) setAuth(true);
	}, []);

	return !isAuth ? (
		<LoginScreen setAuth={setAuth} />
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
