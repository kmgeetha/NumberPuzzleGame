// App.js
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LevelSelectScreen from "./src/screens/LevelSelectScreen";
import GameScreen from "./src/screens/GameScreen";
import { enableScreens } from "react-native-screens";

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Levels" screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Levels" component={LevelSelectScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b3d91" },
});
