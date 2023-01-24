import React from "react";
import { StatusBar } from "expo-status-bar";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, Icon, IconRegistry, Text } from "@ui-kitten/components";
import MainFrameScreen from "./src/layout/MainFrameScreen";
import NavContainer from "./src/layout/NavContainer";
// import AppNavigator from './src/layout/AppNavigator';
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 5000);

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<MainFrameScreen>
				<NavContainer />
			</MainFrameScreen>
			<StatusBar style="auto" />
		</ApplicationProvider>
	</>
);
