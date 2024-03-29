import { Layout, Text } from "@ui-kitten/components";
import { lazy, Suspense, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import adminViMo, { AdminObserver } from "../../viewmodel/AdminViMo";

const LoadingAlert = () => (
	<Layout style={styles.container}>
		<Text status='info' appearance='hint' style={{ fontSize: 10, fontStyle: "italic", textTransform: "uppercase" }}>
			BookStore Manager
		</Text>
		<ActivityIndicator />
	</Layout>
);

const MainNavigator = lazy(() => import("./MainNavigator"));
const LoginScreen = lazy(() => import("../auth/LoginScreen"));

const AuthNavigator = () => {
	const [isAuth, setAuth] = useState<boolean>(false);
	const [loginAttempts, setLoginAttempts] = useState(0);

	const displayDataRetrieved: AdminObserver = (authState: boolean) => {
		setAuth(authState);
	};

	const tryLogin = async () => {
		await adminViMo.login();
		if (adminViMo.getAdmin()?.getUser()) setAuth(true);
	};

	useEffect(() => {
		adminViMo.attach(displayDataRetrieved);
		setLoginAttempts(1);
		tryLogin();
		setTimeout(async () => {
			if (!isAuth) tryLogin();
			setLoginAttempts(2);
		}, 2000);
		return () => adminViMo.detach();
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
