import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const CELL_SIZE = 50;
const CELL_MARGIN = 10;

// ✅ dynamically calculate row size
const ROW_SIZE = Math.floor(screenWidth / (CELL_SIZE + CELL_MARGIN));

export default function useGameLogic(initialGrid, onLevelComplete) {
    const [grid, setGrid] = useState(initialGrid);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [timeLeft, setTimeLeft] = useState(120);

    // Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            onLevelComplete();
            return;
        }
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        setGrid(initialGrid);
        setTimeLeft(120);
        setSelectedIndex(null);
    }, [initialGrid]);

    const handleSelect = (index) => {
        const newGrid = [...grid];

        if (selectedIndex === null) {
            newGrid[index].highlighted = true;
            setGrid(newGrid);
            setSelectedIndex(index);
        } else {
            const first = newGrid[selectedIndex];
            const second = newGrid[index];

            if (
                selectedIndex !== index &&
                !first.faded &&
                !second.faded &&
                (first.value === second.value || first.value + second.value === 10)
            ) {
                newGrid[selectedIndex].faded = true;
                newGrid[index].faded = true;
            } else {
                newGrid[selectedIndex].highlighted = false;
                newGrid[selectedIndex].shake = true;
                newGrid[index].shake = true;

                setTimeout(() => {
                    newGrid[selectedIndex].shake = false;
                    newGrid[index].shake = false;
                    setGrid([...newGrid]);
                }, 300);
            }

            setSelectedIndex(null);
            setGrid(newGrid);

            if (newGrid.every((c) => c.faded)) {
                onLevelComplete();
            }
        }
    };

    // ✅ Add full row dynamically
    const addRow = () => {
        const newRow = Array(ROW_SIZE)
            .fill(0)
            .map(() => ({
                value: Math.floor(Math.random() * 9) + 1,
                faded: false,
                highlighted: false,
                shake: false,
            }));
        setGrid((prev) => [...prev, ...newRow]);
    };

    const resetGame = () => {
        setGrid(initialGrid);
        setSelectedIndex(null);
        setTimeLeft(120);
    };

    return { grid, handleSelect, resetGame, addRow, timeLeft, ROW_SIZE };
}
