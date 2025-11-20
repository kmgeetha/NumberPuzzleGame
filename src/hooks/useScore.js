import { useState, useCallback } from "react";
import { ScoringSystem } from "../../game-core/ScoringSystem";

export default function useScore(initial = 0) {
  const system = new ScoringSystem(initial);
  const [score, setScore] = useState(system.getScore());

  const add = useCallback((p = 10) => {
    system.add(p);
    setScore(system.getScore());
  }, []);

  const penalize = useCallback((p = 5) => {
    system.penalize(p);
    setScore(system.getScore());
  }, []);

  const reset = useCallback(() => {
    system.reset();
    setScore(system.getScore());
  }, []);

  return { score, add, penalize, reset };
}
