// src/components/ui/AddRowButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AddRowButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.text}>+ ROW</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#FF7B00",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    text: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18,
    },
});
