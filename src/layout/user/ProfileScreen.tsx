import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import Admin from "../../core/entities/Admin";
import adminViMo, { AdminObserver } from "../../viewmodel/AdminViMo";

const AddUserIcon = () => <Icon name="person-add" fill="white" height="30" width="30" />;
const LogOutIcon = () => <Icon name="close" fill="white" height="30" width="30" />;
const ProfileTop = () => (
	<Layout style={[styles.common, styles.topLayout]}>
		<TouchableOpacity disabled style={{ backgroundColor: "black", borderRadius: 100, padding: 15, opacity: 0.7 }}>
			<AddUserIcon />
		</TouchableOpacity>
		<TouchableOpacity style={{ backgroundColor: "darkred", borderRadius: 100, padding: 15 }}>
			<LogOutIcon />
		</TouchableOpacity>
	</Layout>
);

const ProfileMiddle = (props: { isEditionActive: boolean }) => (
	<Layout style={styles.middleLayout}>
		<KeyboardAvoidingView style={{ width: "100%", alignItems: "center" }}>
			<Layout>
				<Icon name="person-outline" fill="black" height="100" width="100" />
				<Text style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}>
					{adminViMo.getAdmin().getUser()}
				</Text>
			</Layout>
			<Layout style={styles.inputLayout}>
				<Layout style={[styles.inputTitle, { borderTopLeftRadius: 10 }]}>
					<Text adjustsFontSizeToFit>Nombre</Text>
				</Layout>
				<Input
					value={adminViMo.getAdmin().getName()}
					disabled={!props.isEditionActive}
					editable={props.isEditionActive}
					selectionColor='black'
					style={styles.input}
				/>
			</Layout>
			<Layout style={styles.inputLayout}>
				<Layout style={styles.inputTitle}>
					<Text adjustsFontSizeToFit>Email</Text>
				</Layout>
				<Input
					value={adminViMo.getAdmin().getEmail()}
					disabled={!props.isEditionActive}
					editable={props.isEditionActive}
					selectionColor='black'
					style={styles.input}
				/>
			</Layout>
			<Layout style={styles.inputLayout}>
				<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
					<Text adjustsFontSizeToFit>Móvil</Text>
				</Layout>
				<Input
					value={adminViMo.getAdmin().getMobile()}
					disabled={!props.isEditionActive}
					editable={props.isEditionActive}
					selectionColor='black'
					style={styles.input}
				/>
			</Layout>
		</KeyboardAvoidingView>
	</Layout>
);

const EditIcon = () => <Icon name="edit" fill="white" height="30" width="30" />;
const SlashIcon = () => <Icon name="slash" fill="white" height="30" width="30" />;
const SaveIcon = () => <Icon name="save" fill="white" height="30" width="30" />;
const ProfileBottom = (props: { editionState: boolean; setEditionState: (value: boolean) => void }) => (
	<Layout style={[styles.common, styles.bottomLayout]}>
		<Button
			disabled={true}
			status={props.editionState ? "basic" : "warning"}
			size="tiny"
			accessoryLeft={EditIcon}
			style={{ width: "30%" }}
			onPress={() => props.setEditionState(true)}
		/>
		<Button
			disabled={true}
			status={props.editionState ? "danger" : "basic"}
			size="tiny"
			accessoryLeft={SlashIcon}
			style={{ width: "30%" }}
			onPress={() => props.setEditionState(false)}
		/>
		<Button
			disabled={true}
			status={props.editionState ? "success" : "basic"}
			size="tiny"
			accessoryLeft={SaveIcon}
			style={{ width: "30%" }}
			onPress={() => props.setEditionState(false)}
		/>
	</Layout>
);

const ProfileScreen = () => {
	const [isEditionActive, setEditionState] = useState(false);

	useEffect(() => {
		return;
	}, [isEditionActive]);

	return (
		<Layout style={styles.container}>
			<ProfileTop />
			<ProfileMiddle isEditionActive={isEditionActive} />
			<ProfileBottom editionState={isEditionActive} setEditionState={setEditionState} />
		</Layout>
	);
};

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		textAlign: "center",
	},
	container: { flex: 1, paddingTop: 10, paddingHorizontal: 5 },
	topLayout: {
		flex: 1,
		backgroundColor: transparent,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
	},
	middleLayout: { flex: 5, backgroundColor: transparent, justifyContent: "space-around", alignItems: "center", padding: 5 },
	bottomLayout: { flex: 2, backgroundColor: transparent, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	inputLayout: { width: "70%", height: 40, maxHeight: 40, flexDirection: "row", justifyContent: "center", marginVertical: 10 },
	inputTitle: { backgroundColor: "darkgrey", width: "30%", justifyContent: "center", alignItems: "center" },
	input: {
		width: "80%",
		borderRadius: 0,
		borderWidth: 0,
		borderBottomWidth: 2,
		borderBottomColor: "darkgrey",
	},
});

export default ProfileScreen;
