import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default function ProgressBar({ progress = 0, style }) {
  const width = `${Math.max(0, Math.min(100, progress))}%`;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  track: {
    height: 10,
    backgroundColor: "#ffffff22",
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: 10,
    backgroundColor: colors.accent,
  },
});
