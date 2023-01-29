import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import AuthNavigator from "./src/layout/nav/AuthNavigator";
import { SafeAreaView } from "react-native";
// import AppNavigator from './src/layout/AppNavigator';
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 5000);

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<SafeAreaView style={{ flex: 1 }}>
				<AuthNavigator />
				<StatusBar style="auto" />
			</SafeAreaView>
		</ApplicationProvider>
	</>
);
