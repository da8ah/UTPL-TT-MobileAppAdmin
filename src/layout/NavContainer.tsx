import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation, BottomNavigationTab, Icon, Text } from "@ui-kitten/components";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import BooksScreen from "./books/BooksScreen";

const HomeIcon = () => <Icon name="book-open" fill="black" height="30" width="30" />;
const HomeTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Librería</Text>;

const FlowIcon = () => <Icon name="swap" fill="black" height="30" width="30" />;
const FlowTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Transacciones</Text>;

const UserIcon = () => <Icon name="person" fill="black" height="30" width="30" />;
const UserTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Usuario</Text>;

const UiKittenBottomTabNav = ({ navigation, state }: BottomTabBarProps) => {
	// let previousTabIndex = useRef(0);

	return (
		<BottomNavigation
			// testID='navigation'
			style={{ height: "7%" }}
			indicatorStyle={{ backgroundColor: "black", borderWidth: 0.1 }}
			selectedIndex={state.index}
			onSelect={(index) => navigation.navigate(state.routeNames[index])}
		>
			<BottomNavigationTab
				icon={<HomeIcon />}
				title={HomeTitle}
				onPressIn={() => {
					// let amIAtBooks = !navigation.getState().routes[0].state?.routes[1]?.name ? true : false;
					// if (!amIAtBooks && previousTabIndex.current == 0) {
					navigation.navigate("Home");
					// }
					// previousTabIndex.current = 0;
				}}
			/>
			<BottomNavigationTab
				icon={<FlowIcon />}
				title={FlowTitle}
				onPressIn={() => {
					// previousTabIndex.current = 1;
					navigation.navigate("Flow");
				}}
			/>
			<BottomNavigationTab
				icon={<UserIcon />}
				title={UserTitle}
				onPressIn={() => {
					// previousTabIndex.current = 1;
					navigation.navigate("User");
				}}
			/>
		</BottomNavigation>
	);
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
	<Tab.Navigator tabBar={(props) => <UiKittenBottomTabNav {...props} />} screenOptions={{ headerShown: false }}>
		<Tab.Screen name="Home" component={BooksScreen} />
		<Tab.Screen name="Flow" component={BooksScreen} />
		<Tab.Screen name="User" component={BooksScreen} />
	</Tab.Navigator>
);

const NavContainer = () => (
	<NavigationContainer>
		<BottomTabNavigator />
	</NavigationContainer>
);

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	footer: {
		flex: 2,
		color: "white",
		backgroundColor: "black",
	},
});

export default NavContainer;
