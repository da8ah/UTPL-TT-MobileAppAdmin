import { Layout, Text } from "@ui-kitten/components";
import { lazy, Suspense, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import adminViMo from "../../viewmodel/AdminViMo";

const LoadingAlert = () => (
	<Layout style={styles.container}>
		<Text status='warning' appearance='hint' style={{ fontSize: 10, fontStyle: "italic", textTransform: "uppercase" }}>
			Loading
		</Text>
		<ActivityIndicator />
	</Layout>
);

const MainNavigator = lazy(() => import("./MainNavigator"));
const LoginScreen = lazy(() => import("../auth/LoginScreen"));

const AuthNavigator = () => {
	const [isAuth, setAuth] = useState<boolean>(false);
	const [loginAttempts, setLoginAttempts] = useState(0);

	const tryLogin = async () => {
		await adminViMo.login();
		if (adminViMo.getAdmin()?.getUser()) setAuth(true);
	};

	useEffect(() => {
		setLoginAttempts(1);
		tryLogin();
		setTimeout(async () => {
			if (!isAuth) tryLogin();
			setLoginAttempts(2);
		}, 2000);
	}, []);

	return !isAuth ? (
		loginAttempts === 2 ? (
			<Suspense fallback={<LoadingAlert />}>
				<LoginScreen setAuth={setAuth} />
			</Suspense>
		) : (
			<LoadingAlert />
		)
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
