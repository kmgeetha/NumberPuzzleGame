// src/screens/GameScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Grid from "../components/Grid";
import useGameLogic from "../hooks/UserGameLogic";
import useLevelManager from "../hooks/UseLevelManager";

export default function GameScreen() {
    const { currentLevel, levelData, nextLevel, totalLevels } = useLevelManager();

    // pass a callback to be notified on level complete/fail
    const onLevelComplete = ({ success, reason }) => {
        if (success) {
            Alert.alert("Level complete!", "Proceeding to next level.", [
                { text: "OK", onPress: () => nextLevel() },
            ]);
        }
    };

    // destructure values returned from useGameLogic
    const {
        grid,
        handleSelect,
        resetGame,
        addRow,
        timeLeft,
        filledRows,
    } = useGameLogic(levelData, onLevelComplete);

    const addRowDisabled = filledRows >= (levelData?.maxRows ?? 9);
    const score = grid.filter((cell) => cell.matched).length;

    return (
        <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.stage}>
                    Level {currentLevel + 1} 
                </Text>
                <Text style={styles.score}>
                    Score: {grid.filter((c) => c.matched).length}
                </Text>
                <Text style={styles.trophy}>⏱ {timeLeft}s</Text>
            </View>


            <View style={styles.gridWrapper}>
                <Grid grid={grid} onCellPress={handleSelect} />
            </View>

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: addRowDisabled ? "#9adbd5" : "#4ECDC4" }]}
                    onPress={addRow}
                    disabled={addRowDisabled}
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
    container: { flex: 1 },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 50,
        alignItems: "center",
    },
    stage: { color: "#fff", fontSize: 16, opacity: 0.9 },
    score: { color: "#FFD93D", fontSize: 16, fontWeight: "600" },
    trophy: { color: "#fff", fontSize: 14 },
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
