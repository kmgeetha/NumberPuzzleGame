import { useState } from "react";
import { generateGrid } from "../game-core/GridGenerator";

/**
 * useGrid manages grid state: selection, matches, blocked cells
 * returns grid, select(row,col) and helpers
 */
export default function useGrid({ rows, columns, blockedTiles = 0 }) {
  const [grid, setGrid] = useState(() => generateGrid(rows, columns, blockedTiles));

  const resetGrid = () => setGrid(generateGrid(rows, columns, blockedTiles));

  const markMatched = (r1, c1, r2, c2) => {
    setGrid((prev) =>
      prev.map((row, ri) =>
        row.map((cell, ci) =>
          (ri === r1 && ci === c1) || (ri === r2 && ci === c2)
            ? { ...cell, matched: true, value: null }
            : cell
        )
      )
    );
  };

  const setCell = (r, c, data) => {
    setGrid((prev) => {
      const copy = prev.map((row) => row.map((cell) => ({ ...cell })));
      copy[r][c] = { ...copy[r][c], ...data };
      return copy;
    });
  };

  const availableCells = () => grid.flat().filter((c) => !c.matched && !c.blocked && c.value !== null).length;

  return {
    grid,
    resetGrid,
    markMatched,
    setCell,
    available: availableCells,
  };
}
