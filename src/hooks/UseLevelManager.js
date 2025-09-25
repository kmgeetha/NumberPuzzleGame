import { useState } from "react";
import level1 from "../levels/level1.json";
import level2 from "../levels/level2.json";
import level3 from "../levels/level3.json";

const levels = [level1, level2, level3];

export default function useLevelManager() {
    const [currentLevel, setCurrentLevel] = useState(0);

    const nextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(currentLevel + 1);
        } else {
            // Restart after last level
            setCurrentLevel(0);
        }
    };

    const resetLevels = () => {
        setCurrentLevel(0);
    };

    return {
        currentLevel,
        levelData: levels[currentLevel],
        nextLevel,
        resetLevels,
        totalLevels: levels.length,
    };
}
