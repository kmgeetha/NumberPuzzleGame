// src/hooks/useGameLogic.js
import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 9; // 9 per row
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

// helper: shuffle 1..9
const shuffleRow = () => {
    const numbers = Array.from({ length: GRID_SIZE }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
};

const makeEmptyCell = () => ({
    value: null,
    faded: false, // faded true => visually dull / treated as matched/empty
    highlighted: false,
    shake: false,
    // optional: matched flag (same as faded but clearer)
    matched: false,
});

export default function useGameLogic(levelData, onLevelComplete) {
    // grid is flat array of length 81
    const [grid, setGrid] = useState(Array(TOTAL_CELLS).fill(null).map(makeEmptyCell));
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [filledRows, setFilledRows] = useState(0); // number of rows currently having numbers (not counting empty)
    const [timeLeft, setTimeLeft] = useState(levelData?.timeLimit ?? 120);
    const timerRef = useRef(null);

    // initialize level (pre-fill initialRows). This respects levelData and will re-run when levelData changes.
    useEffect(() => {
        // reset state
        setGrid(Array(TOTAL_CELLS).fill(null).map(makeEmptyCell));
        setSelectedIndex(null);
        const initialRows = levelData?.initialRows ?? 3;
        const newGrid = Array(TOTAL_CELLS).fill(null).map(makeEmptyCell);

        for (let row = 0; row < initialRows; row++) {
            const rowNumbers = shuffleRow();
            for (let c = 0; c < GRID_SIZE; c++) {
                const idx = row * GRID_SIZE + c;
                newGrid[idx] = {
                    value: rowNumbers[c],
                    faded: false,
                    highlighted: false,
                    shake: false,
                    matched: false,
                };
            }
        }

        setGrid(newGrid);
        setFilledRows(initialRows);
        setTimeLeft(levelData?.timeLimit ?? 120);
        // start timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [levelData]);

    // watch for timeLeft -> level fail / reset or notify
    useEffect(() => {
        if (timeLeft <= 0) {
            // time out: stop timer and call level complete callback with failure
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            // You might want to expose a callback for timeouts. For now, call onLevelComplete with false
            if (onLevelComplete) onLevelComplete({ success: false, reason: "timeout" });
        }
    }, [timeLeft, onLevelComplete]);

    // helper to check if level is cleared: all non-empty cells are matched (faded/matched)
    const checkLevelComplete = (gridState) => {
        for (let i = 0; i < gridState.length; i++) {
            const cell = gridState[i];
            // if a cell has a value and is not matched -> not complete
            if (cell.value !== null && !cell.matched) return false;
        }
        return true;
    };

    // addRow logic: respects levelData.maxRows and rowsToAddPerClick
    const addRow = () => {
        const maxRows = levelData?.maxRows ?? GRID_SIZE;
        const perClick = levelData?.rowsToAddPerClick ?? 1;
        if (filledRows >= maxRows) return; // cannot add more

        const rowsToAdd = Math.min(perClick, maxRows - filledRows);
        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            for (let r = 0; r < rowsToAdd; r++) {
                const targetRow = filledRows + r;
                const rowNumbers = shuffleRow();
                for (let c = 0; c < GRID_SIZE; c++) {
                    const idx = targetRow * GRID_SIZE + c;
                    newGrid[idx] = {
                        value: rowNumbers[c],
                        faded: false,
                        highlighted: false,
                        shake: false,
                        matched: false,
                    };
                }
            }
            return newGrid;
        });
        setFilledRows((f) => f + rowsToAdd);
    };

    // resetGame: clear everything and re-initialize initial rows (like mount)
    const resetGame = () => {
        // stop timer momentarily
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        // Re-run initialization by triggering a change to levelData: easiest is to reuse the same logic
        const initialRows = levelData?.initialRows ?? 3;
        const newGrid = Array(TOTAL_CELLS).fill(null).map(makeEmptyCell);
        for (let row = 0; row < initialRows; row++) {
            const rowNumbers = shuffleRow();
            for (let c = 0; c < GRID_SIZE; c++) {
                const idx = row * GRID_SIZE + c;
                newGrid[idx] = {
                    value: rowNumbers[c],
                    faded: false,
                    highlighted: false,
                    shake: false,
                    matched: false,
                };
            }
        }
        setGrid(newGrid);
        setFilledRows(initialRows);
        setSelectedIndex(null);
        setTimeLeft(levelData?.timeLimit ?? 120);
        // start timer again
        timerRef.current = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);
    };

    // matching rule: equal OR sum to 10
    const isMatch = (a, b) => {
        if (a == null || b == null) return false;
        if (a === b) return true;
        if (a + b === 10) return true;
        return false;
    };

    // handle cell press
    const handleSelect = (index) => {
        const cell = grid[index];
        if (!cell) return;
        // ignore clicks on empty slots or already matched (faded)
        if (cell.value === null || cell.matched || cell.faded) return;

        // first selection
        if (selectedIndex === null) {
            const newGrid = [...grid];
            newGrid[index] = { ...newGrid[index], highlighted: true };
            setGrid(newGrid);
            setSelectedIndex(index);
            return;
        }

        // same cell tapped twice -> unselect
        if (selectedIndex === index) {
            const newGrid = [...grid];
            newGrid[index] = { ...newGrid[index], highlighted: false };
            setGrid(newGrid);
            setSelectedIndex(null);
            return;
        }

        // second selection -> check match
        const first = grid[selectedIndex];
        const second = grid[index];

        // if either is null/matched already, ignore
        if (!first || !second || first.matched || second.matched) {
            // clear highlight(s)
            setGrid((prev) => {
                const copy = [...prev];
                if (copy[selectedIndex]) copy[selectedIndex] = { ...copy[selectedIndex], highlighted: false };
                if (copy[index]) copy[index] = { ...copy[index], highlighted: false };
                return copy;
            });
            setSelectedIndex(null);
            return;
        }

        const match = isMatch(first.value, second.value);

        if (match) {
            // mark both as matched (faded & matched true), keep value visible (as required)
            setGrid((prev) => {
                const copy = [...prev];
                copy[selectedIndex] = {
                    ...copy[selectedIndex],
                    faded: true,
                    matched: true,
                    highlighted: false,
                };
                copy[index] = {
                    ...copy[index],
                    faded: true,
                    matched: true,
                    highlighted: false,
                };
                return copy;
            });

            setSelectedIndex(null);

            // check if level complete
            setTimeout(() => {
                setGrid((latestGrid) => {
                    if (checkLevelComplete(latestGrid)) {
                        // level complete success
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                        if (onLevelComplete) onLevelComplete({ success: true });
                    }
                    return latestGrid;
                });
            }, 250);

            return;
        } else {
            // invalid match -> animate (shake) both cells then clear highlight
            setGrid((prev) => {
                const copy = [...prev];
                if (copy[selectedIndex]) copy[selectedIndex] = { ...copy[selectedIndex], shake: true };
                if (copy[index]) copy[index] = { ...copy[index], shake: true };
                return copy;
            });

            // clear shakes and highlights after animation duration (matching your Cell animation durations)
            setTimeout(() => {
                setGrid((prev) => {
                    const copy = [...prev];
                    if (copy[selectedIndex]) copy[selectedIndex] = { ...copy[selectedIndex], shake: false, highlighted: false };
                    if (copy[index]) copy[index] = { ...copy[index], shake: false, highlighted: false };
                    return copy;
                });
                setSelectedIndex(null);
            }, 300); // 300ms matches cell animation timing
        }
    };

    return {
        grid,
        handleSelect,
        resetGame,
        addRow,
        timeLeft,
        filledRows,
        setFilledRows,
    };
}
