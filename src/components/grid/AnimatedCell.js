import React, { useRef, useEffect } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";
import { popIn, popOut } from "../animations/scale";

export default function AnimatedCell({
  value,
  onPress,
  disabled,
  highlighted,
  style,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // pop in animation on mount
    popIn(scale);
    return () => popOut(scale);
  }, []);

  return (
    <Animated.View style={[styles.cell, { transform: [{ scale }] }, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={[styles.touch, highlighted && styles.highlighted]}
      >
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    margin: 3,
    borderRadius: 8,
    overflow: "hidden",
  },
  touch: {
    flex: 1,
    backgroundColor: "#1F3B57",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  highlighted: { borderWidth: 2, borderColor: "#4ECDC4" },
  text: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
