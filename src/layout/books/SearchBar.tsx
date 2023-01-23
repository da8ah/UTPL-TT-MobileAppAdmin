import { Icon, Input } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const SearchIcon = () => <Icon name="search-outline" fill="black" height="30" width="30" />;

const SearchBar = () => {
	return (
		<Input
			// ref={(component: Input) => authorInputRef.current = component}
			disabled={true}
			accessoryLeft={<SearchIcon />}
			selectionColor='black'
			style={styles.input}
			placeholder={"Buscar por coincidencia o ISBN"}
			// onChangeText={}
			// onFocus={}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "90%",
		backgroundColor: "transparent",
		borderColor: "gray",
		borderRadius: 20,
	},
});

export default SearchBar;
