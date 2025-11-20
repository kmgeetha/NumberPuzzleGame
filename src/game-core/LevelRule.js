export class LevelRule {
    constructor(config = {}) {
        this.config = config;
    }

    isLevelComplete(gameState) {
        throw new Error("isLevelComplete should be implemented");
    }

    calculateXP(gameState) {
        // default xp: matchedPairs * 10
        return (gameState.matchedPairs || 0) * 10;
    }
}
