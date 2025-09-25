import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Timer({ timeLeft }) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <Text style={styles.timer}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
    );
}

const styles = StyleSheet.create({
    timer: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
});
