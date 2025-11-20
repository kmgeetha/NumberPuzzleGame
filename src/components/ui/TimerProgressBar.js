// src/components/ui/TimerProgressBar.js
import React from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function TimerProgressBar({ timeLeft, duration }) {
    const widthPercent = (timeLeft / duration) * 100;

    return (
        <View style={styles.container}>
            <View style={[styles.bar, { width: `${widthPercent}%` }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 12,
        width: "90%",
        backgroundColor: "#333",
        borderRadius: 8,
        overflow: "hidden",
        alignSelf: "center",
        marginVertical: 10,
    },
    bar: {
        height: "100%",
        backgroundColor: "#FFCC00",
    },
});
