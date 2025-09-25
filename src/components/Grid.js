import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Cell from "./Cell";

const CELL_SIZE = 50;
const GRID_SIZE = 9;

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
        width: CELL_SIZE * GRID_SIZE + 9 * 10, // 🔹 fit exactly 9 cells + margins
        alignSelf: "center",
    },
});
