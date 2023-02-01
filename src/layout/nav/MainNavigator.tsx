import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewStockBookScreen from "../books/NewStockBookScreen";
import StockBookScreen from "../books/StockBookScreen";
import { RootStackParamList } from "../ScreenTypes";
import MainTabsNav from "./components/MainTabsNav";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown: false }}>
			<Stack.Group>
				<Stack.Screen name='MainTabs' component={MainTabsNav} />
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					animation: "fade_from_bottom",
					animationTypeForReplace: "pop",
				}}
			>
				{/* MODALS */}
				<Stack.Screen name='NewStockBook' component={NewStockBookScreen} />
				<Stack.Screen name='StockBook' component={StockBookScreen} />
			</Stack.Group>
		</Stack.Navigator>
	</NavigationContainer>
);

export default MainNavigator;
