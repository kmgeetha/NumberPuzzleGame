import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff0f",
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },
});
