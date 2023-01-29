import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
				screenOptions={{ presentation: "containedModal", animation: "fade_from_bottom", gestureEnabled: true, gestureDirection: "vertical" }}
			>
				{/* <Stack.Group> */}
				<Stack.Screen
					name='StockBook'
					component={StockBookScreen}
					initialParams={{ bookIndex: 0 }}
					options={
						{
							// fullScreenGestureEnabled: true,
						}
					}
				/>
				{/* <Stack.Screen
				name='StockBook'
				component={StockBookScreen}
				initialParams={{ bookid: 0 }}
				options={{
					presentation: "modal",
					headerShown: true,
					headerTitle: "StockBook",
					headerTitleAlign: "center",
				}}
			/> */}
			</Stack.Group>
		</Stack.Navigator>
	</NavigationContainer>
);

export default MainNavigator;
