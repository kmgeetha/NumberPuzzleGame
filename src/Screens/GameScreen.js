import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Grid from "../components/grid/Grid";
import ScoreBox from "../components/ui/ScoreBox";
import TimerBox from "../components/ui/TimerBox";
import AppButton from "../components/ui/AppButton";
import { LevelManager } from "../game-core/LevelManager";
import { DifficultyStrategy } from "../game-core/DifficultyStrategy";
import { NumberMatchRule } from "../game-core/NumberMatchRule";

export default function GameScreen({ route, navigation }) {
  const startLevel = route?.params?.startLevel || 1;
  const lmRef = useRef(new LevelManager(new DifficultyStrategy(), NumberMatchRule));
  const lm = lmRef.current;
  // Initialize level manager to requested start
  useEffect(() => {
    lm.reset();
    while (lm.currentLevel < startLevel) lm.levelUp();
  }, []);

  const [levelConfig, setLevelConfig] = useState(lm.getLevelData());
  const [score, setScore] = useState(0);

  // remountable GameArea: render key changes when level changes
  const [key, setKey] = useState(0);

  const onLevelComplete = ({ success, gameState }) => {
    const result = lm.onGameProgress(gameState || {});
    setScore(gameState?.score || score);
    if (result.success) {
      Alert.alert("Level Complete", `Proceeding to level ${lm.currentLevel}`);
      setLevelConfig(lm.getLevelData());
      setKey((k) => k + 1);
    } else {
      if (!success) Alert.alert("Level Failed", "Try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Level {lm.currentLevel}</Text>
        <View style={styles.topRow}>
          <ScoreBox score={score} />
          <TimerBox timeLeft={levelConfig.time} />
        </View>
      </View>

      <View style={styles.gridWrap}>
        <GameArea key={key} levelConfig={levelConfig} onLevelComplete={onLevelComplete} />
      </View>

      <View style={styles.controls}>
        <AppButton title="Restart Level" onPress={() => setKey((k) => k + 1)} />
      </View>
    </View>
  );
}

function GameArea({ levelConfig, onLevelComplete }) {
  // useGameLogic handles grid, selection, matches and calls onLevelComplete when done
  const { grid, handleSelect, resetGame, matchedPairs, timeLeft } = require("../hooks/useGameLogic").default(levelConfig, onLevelComplete);

  useEffect(() => {
    // when matchedPairs changes we could push progress to parent if needed
  }, [matchedPairs]);

  return (
    <View style={{ alignItems: "center" }}>
      <Grid grid={grid} onCellPress={handleSelect} />
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Matched: {matchedPairs}</Text>
        <Text style={{ color: "#fff", textAlign: "center" }}>Time Left: {timeLeft}s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071228" },
  top: { padding: 14 },
  title: { color: "#fff", fontSize: 20, fontWeight: "700" },
  topRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  gridWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  controls: { padding: 14, alignItems: "center" },
});
