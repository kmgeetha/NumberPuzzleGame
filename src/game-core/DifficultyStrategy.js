// always 9x9, difficulty tweaks
export class DifficultyStrategy {
  getLevelConfig(level) {
    const rows = 9;
    const cols = 9;
    switch (level) {
      case 1:
        return { rows, columns: cols, time: 240, targetScore: 18, blockedTiles: 6, maxRows: 9 };
      case 2:
        return { rows, columns: cols, time: 180, targetScore: 28, blockedTiles: 12, maxRows: 9 };
      case 3:
        return { rows, columns: cols, time: 120, targetScore: 38, blockedTiles: 18, maxRows: 9 };
      default:
        return { rows, columns: cols, time: 90, targetScore: 48, blockedTiles: 24, maxRows: 9 };
    }
  }
}
