import { NavigationContainer } from "@react-navigation/native";
import MainFrameScreen from "../MainFrameScreen";
import BottomTabNavigator from "./BottomTabNav";

const MainTabsNav = () => (
	<MainFrameScreen>
		<BottomTabNavigator />
	</MainFrameScreen>
);

export default MainTabsNav;
