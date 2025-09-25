import React from "react";
import { View, StyleSheet } from "react-native";
import Cell from "./Cell";

export default function Grid({ grid, onCellPress }) {
    return (
        <View style={styles.grid}>
            {grid.map((cell, index) => (
                <Cell
                    key={index}
                    value={cell.value}
                    faded={cell.faded}
                    highlighted={cell.highlighted}
                    shake={cell.shake}
                    onPress={() => onCellPress(index)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
    },
});
