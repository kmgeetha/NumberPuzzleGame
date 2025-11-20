import { LevelFactory } from "./LevelFactory.js";
import { DifficultyStrategy } from "./DifficultyStrategy.js";
import { LevelRule } from "./LevelRule.js";

export class LevelManager {
  constructor(strategy = new DifficultyStrategy(), RuleClass = LevelRule) {
    this.strategy = strategy;
    this.RuleClass = RuleClass;
    this.currentLevel = 1;
    this.xp = 0;
    this.levelData = this.createLevel(this.currentLevel);
  }

  createLevel(levelNum) {
    const cfg = this.strategy.getLevelConfig(levelNum);
    return LevelFactory.createLevel(cfg, this.RuleClass);
  }

  getLevelData() {
    return this.levelData.config;
  }

  // Game state is provided by hook (matchedPairs, timeLeft, score)
  onGameProgress(gameState) {
    const xp = this.levelData.calculateXP(gameState);
    this.xp += xp;

    const complete = this.levelData.isLevelComplete(gameState);
    if (complete) {
      this.levelUp();
      return { success: true };
    }
    return { success: false };
  }

  levelUp() {
    this.currentLevel++;
    this.xp = 0;
    this.levelData = this.createLevel(this.currentLevel);
  }

  reset() {
    this.currentLevel = 1;
    this.xp = 0;
    this.levelData = this.createLevel(1);
  }
}
