import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppButton from "../components/ui/AppButton";

export default function LevelSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Number Master</Text>
      <View style={styles.btnWrap}>
        <AppButton title="Level 1 — Easy" onPress={() => navigation.navigate("Game", { startLevel: 1 })} />
      </View>
      <View style={styles.btnWrap}>
        <AppButton title="Level 2 — Medium" onPress={() => navigation.navigate("Game", { startLevel: 2 })} />
      </View>
      <View style={styles.btnWrap}>
        <AppButton title="Level 3 — Hard" onPress={() => navigation.navigate("Game", { startLevel: 3 })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#071228" },
  title: { color: "#fff", fontSize: 28, marginBottom: 24, fontWeight: "700" },
  btnWrap: { width: "80%", marginVertical: 8 },
});
