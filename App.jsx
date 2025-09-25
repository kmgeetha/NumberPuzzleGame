import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import GameScreen from "./src/Screens/GameScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GameScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
