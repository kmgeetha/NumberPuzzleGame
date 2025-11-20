export class ScoringSystem {
  constructor(initial = 0) {
    this.score = initial;
  }

  add(points = 10) {
    this.score += points;
  }

  penalize(points = 5) {
    this.score = Math.max(0, this.score - points);
  }

  reset() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }
}
