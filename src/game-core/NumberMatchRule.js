import { LevelRule } from "./LevelRule.js";

export class NumberMatchRule extends LevelRule {
  // gameState: { matchedPairs, timeLeft, score }
  isLevelComplete(gameState) {
    // completion when matchedPairs reaches targetScore
    return (gameState.matchedPairs || 0) >= (this.config.targetScore || 0);
  }

  calculateXP(gameState) {
    return (gameState.matchedPairs || 0) * 10 + (this.config.timeBonus ? gameState.timeLeft : 0);
  }
}
