import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default function TimerBox({ timeLeft = 0, style }) {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  return (
    <View style={[styles.box, style]}>
      <Text style={styles.label}>TIME</Text>
      <Text style={styles.value}>
        {mins}:{secs < 10 ? `0${secs}` : secs}
      </Text>
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
  value: { color: colors.primary, fontSize: 20, fontWeight: "800" },
});
