import React from "react";
import { View, StyleSheet } from "react-native";

export default function Panel({ children, style }) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#ffffff10",
  },
});
