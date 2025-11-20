import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default function ScoreBox({ score = 0, style }) {
  return (
    <View style={[styles.box, style]}>
      <Text style={styles.label}>SCORE</Text>
      <Text style={styles.value}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff14",
    alignItems: "center",
    minWidth: 88,
  },
  label: { color: "#ddd", fontSize: 12, marginBottom: 4 },
  value: { color: colors.accent, fontSize: 20, fontWeight: "800" },
});
