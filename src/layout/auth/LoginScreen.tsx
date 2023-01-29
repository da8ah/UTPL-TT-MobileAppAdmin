import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

const LoginScreenHeader = () => (
	<Layout style={[styles.common, styles.header]}>
		<Text category='h1' style={{ color: "white", fontFamily: "serif" }}>
			BOOKSTORE
		</Text>
		<Text category="h5" status="primary" style={{ fontStyle: "italic" }}>
			MANAGER
		</Text>
	</Layout>
);

const InputWithPassword = () => {
	const [inputValue, setInputValue] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const togglePasswordVisibility = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const PasswordVisibilityIcon = () => (
		<TouchableWithoutFeedback onPress={togglePasswordVisibility}>
			<Icon name={secureTextEntry ? "eye-off" : "eye"} fill="black" height="20" width="20" />
		</TouchableWithoutFeedback>
	);

	return (
		<Input
			selectionColor='black'
			textContentType="password"
			style={styles.input}
			value={inputValue}
			accessoryRight={PasswordVisibilityIcon}
			secureTextEntry={secureTextEntry}
			onChangeText={(nextValue) => setInputValue(nextValue)}
		/>
	);
};

const ButtonIcon = () => <Icon name="log-in" fill="white" height="20" width="20" />;
const LoginScreenBody = () => (
	<Layout style={[styles.common, styles.body]}>
		<Layout style={[styles.common, { marginVertical: 20 }]}>
			<Icon name="people" fill="black" height="100" width="100" />
			<Text style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic" }}>Admin</Text>
		</Layout>
		<KeyboardAvoidingView style={{ width: "100%", alignItems: "center" }} behavior="padding">
			<Layout style={styles.inputLayout}>
				<Layout style={[styles.inputTitle, { borderTopLeftRadius: 10 }]}>
					<Text adjustsFontSizeToFit>USUARIO</Text>
				</Layout>
				<Input selectionColor='black' style={styles.input} />
			</Layout>
			<Layout style={styles.inputLayout}>
				<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
					<Text adjustsFontSizeToFit>CLAVE</Text>
				</Layout>
				<InputWithPassword />
			</Layout>
			<Layout style={styles.buttonLayout}>
				<Button style={styles.button} accessoryRight={ButtonIcon}>
					INICIAR SESIÓN
				</Button>
			</Layout>
		</KeyboardAvoidingView>
	</Layout>
);

const LoginScreen = () => (
	<Layout style={[styles.common, styles.container]}>
		<LoginScreenHeader />
		<LoginScreenBody />
	</Layout>
);

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	container: { flex: 1 },
	header: { backgroundColor: "black", flex: 2 },
	body: { flex: 8, justifyContent: "flex-start", paddingTop: 20 },
	icons: { width: "20%", justifyContent: "space-evenly" },
	imageLayout: { backgroundColor: transparent, alignContent: "center" },
	image: {
		maxWidth: "100%",
		height: 170,
		resizeMode: "contain",
	},
	inputLayout: { width: "70%", height: 40, maxHeight: 40, flexDirection: "row", justifyContent: "center", marginVertical: 10 },
	inputTitle: { backgroundColor: "darkgrey", width: "30%", justifyContent: "center", alignItems: "center" },
	input: {
		width: "80%",
		borderRadius: 0,
		borderWidth: 0,
		borderBottomWidth: 2,
		borderBottomColor: "darkgrey",
	},
	buttonLayout: { width: "100%", alignItems: "center", marginVertical: 30 },
	button: { width: "70%" },
});

export default LoginScreen;
