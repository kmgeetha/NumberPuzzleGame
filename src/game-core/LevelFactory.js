import { LevelRule } from "./LevelRule.js";

export class LevelFactory {
  static createLevel(levelConfig, RuleClass = LevelRule) {
    return new RuleClass(levelConfig);
  }
}
