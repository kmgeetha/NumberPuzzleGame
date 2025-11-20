import { useState, useEffect, useCallback } from "react";
import useGrid from "./useGrid";
import useTimer from "./useTimer";

/**
 * levelData: { rows, columns, time, blockedTiles, targetScore, maxRows }
 * onLevelComplete: callback({ success, matchedPairs })
 */
export default function useGameLogic(levelData, onLevelComplete) {
  const { grid, resetGrid, markMatched, available } = useGrid({
    rows: levelData.rows,
    columns: levelData.columns,
    blockedTiles: levelData.blockedTiles || 0,
  });

  const [first, setFirst] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [filledRows, setFilledRows] = useState(levelData.rows);
  // timer
  const { timeLeft, reset } = useTimer(levelData.time || 60, () => {
    onLevelComplete({ success: false });
  });

  useEffect(() => {
    // reset when levelData changes (parent remounts usually)
    setFirst(null);
    setMatchedPairs(0);
    reset(levelData.time || 60);
  }, [levelData]);

  const canConnect = (a, b) => {
    // Use Number Master 0/1/2 turn algorithm - simplified: allow match if same or sum to 10 and exist path
    if (!a || !b) return false;
    if (a.row === b.row && a.col === b.col) return false;
    const v1 = a.value;
    const v2 = b.value;
    if (v1 === null || v2 === null) return false;
    if (!(v1 === v2 || (v1 + v2 === 10))) return false;

    // 0-turn check: same row or same col without obstacles
    const isEmpty = (r, c) => grid[r][c] && grid[r][c].value === null;
    const rows = grid.length;
    const cols = grid[0].length;

    const clearHoriz = (r, c1, c2) => {
      for (let c = Math.min(c1, c2) + 1; c < Math.max(c1, c2); c++) {
        if (grid[r][c].value !== null) return false;
      }
      return true;
    };

    const clearVert = (c, r1, r2) => {
      for (let r = Math.min(r1, r2) + 1; r < Math.max(r1, r2); r++) {
        if (grid[r][c].value !== null) return false;
      }
      return true;
    };

    if (a.row === b.row && clearHoriz(a.row, a.col, b.col)) return true;
    if (a.col === b.col && clearVert(a.col, a.row, b.row)) return true;

    // 1-turn corner checks
    const corner1 = { row: a.row, col: b.col };
    const corner2 = { row: b.row, col: a.col };

    if (
      grid[corner1.row][corner1.col].value === null &&
      clearHoriz(a.row, a.col, corner1.col) &&
      clearVert(b.col, a.row, b.row)
    )
      return true;

    if (
      grid[corner2.row][corner2.col].value === null &&
      clearVert(a.col, a.row, corner2.row) &&
      clearHoriz(b.row, a.col, b.col)
    )
      return true;

    // 2-turn: scan rows and columns (simplified)
    for (let r = 0; r < rows; r++) {
      if (grid[r][a.col].value === null && grid[r][b.col].value === null) {
        if (clearVert(a.col, a.row, r) && clearVert(b.col, b.row, r) && clearHoriz(r, a.col, b.col))
          return true;
      }
    }

    for (let c = 0; c < cols; c++) {
      if (grid[a.row][c].value === null && grid[b.row][c].value === null) {
        if (clearHoriz(a.row, a.col, c) && clearHoriz(b.row, b.col, c) && clearVert(c, a.row, b.row))
          return true;
      }
    }

    return false;
  };

  const handleSelect = (r, c) => {
    const cell = grid[r][c];
    if (!cell || cell.matched || cell.blocked || cell.value === null) return;

    if (!first) {
      setFirst({ row: r, col: c, value: cell.value });
      return;
    }

    const a = first;
    const b = { row: r, col: c, value: cell.value };

    if (a.row === b.row && a.col === b.col) {
      setFirst(null);
      return;
    }

    // check match by value and path
    if ((a.value === b.value || a.value + b.value === 10) && canConnect(a, b)) {
      markMatched(a.row, a.col, b.row, b.col);
      setMatchedPairs((m) => m + 1);
      // check completion
      const gameState = { matchedPairs: matchedPairs + 1, timeLeft, score: (matchedPairs + 1) * 10 };
      if ((matchedPairs + 1) >= (levelData.targetScore || Infinity)) {
        onLevelComplete({ success: true, gameState });
      }
    } else {
      // not a valid match — no penalty implemented (could add)
    }
    setFirst(null);
  };

  const addRow = () => {
    // optional: not implemented fully — consumer can remount with a new rows value
  };

  const resetGame = () => {
    resetGrid();
    setFirst(null);
    setMatchedPairs(0);
    reset(levelData.time || 60);
  };

  return { grid, handleSelect, resetGame, addRow, filledRows, matchedPairs, timeLeft };
}
