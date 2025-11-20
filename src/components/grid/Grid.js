import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedCell from "./AnimatedCell";

/**
 * Expects grid: array of rows, each row: array of cells { value, matched, blocked, id }
 * onPress(rowIndex, colIndex)
 */
export default function Grid({ grid = [], onCellPress }) {
  return (
    <View style={styles.wrapper}>
      {grid.map((row, rIdx) => (
        <View key={`r${rIdx}`} style={styles.row}>
          {row.map((cell, cIdx) => (
            <AnimatedCell
              key={cell.id ?? `${rIdx}-${cIdx}`}
              value={cell?.value ?? ""}
              onPress={() => onCellPress(rIdx, cIdx)}
              disabled={cell == null || cell.matched || cell.blocked}
              highlighted={cell?.highlighted}
              style={cell && cell.blocked ? styles.blocked : null}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "center", justifyContent: "center" },
  row: { flexDirection: "row" },
  blocked: { opacity: 0.45, backgroundColor: "#333" },
});
