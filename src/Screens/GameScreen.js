import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Grid from "../components/Grid";
import Timer from "../components/Timer";
import useGameLogic from "../hooks/UserGameLogic";
import useLevelManager from "../hooks/UseLevelManager";

export default function GameScreen() {
    const { currentLevel, levelData, nextLevel, totalLevels } = useLevelManager();

    const { grid, handleSelect, resetGame, addRow, timeLeft } = useGameLogic(
        levelData,
        nextLevel
    );

    return (
        <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
            {/* 🔹 Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.stage}>Level {currentLevel + 1}</Text>
                <Text style={styles.score}>Score: {grid.filter((c) => c.faded).length}</Text>
                <Text style={styles.trophy}>🏆 {totalLevels * 100}</Text>
            </View>

            {/* 🔹 Timer */}

            {/* 🔹 Grid */}
            <View style={styles.gridWrapper}>
                <Grid grid={grid} onCellPress={handleSelect} />
            </View>

            {/* 🔹 Bottom Buttons */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#4ECDC4" }]}
                    onPress={addRow}
                >
                    <Text style={styles.btnText}>＋</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF6B6B" }]}
                    onPress={resetGame}
                >
                    <Text style={styles.btnText}>⟲</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FFD93D" }]}
                    onPress={nextLevel}
                >
                    <Text style={styles.btnText}>⇨</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 50,
        alignItems: "center",
    },
    stage: { color: "#fff", fontSize: 18, opacity: 0.8 },
    score: { color: "#FFD93D", fontSize: 22, fontWeight: "bold" },
    trophy: { color: "#fff", fontSize: 16 },
    gridWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 20,
    },
    button: {
        width: 65,
        height: 65,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    btnText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
});
