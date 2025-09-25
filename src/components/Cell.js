import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";

const CELL_SIZE = 50; // ✅ keep consistent with useGameLogic

export default function Cell({ value, faded, highlighted, shake, onPress }) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (faded) {
            Animated.timing(fadeAnim, {
                toValue: 0.3,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(1);
        }
    }, [faded]);

    useEffect(() => {
        if (shake) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        }
    }, [shake]);

    return (
        <Animated.View
            style={[
                styles.cell,
                highlighted && styles.highlighted,
                { opacity: fadeAnim, transform: [{ translateX: shakeAnim }] },
            ]}
        >
            <TouchableOpacity style={styles.touchArea} onPress={onPress} disabled={faded}>
                <Text style={styles.text}>{value}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
        borderRadius: 8,
    },
    touchArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: { fontSize: 18, fontWeight: "bold" },
    highlighted: { borderWidth: 2, borderColor: "blue" },
});
