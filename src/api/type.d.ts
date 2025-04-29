interface GameGuessItemResult<T> {
  key: T;
  value: boolean;
  id?: number;
}

interface GameGuessDistanceResult {
  key: number;
  value: "equiv" | "high" | "low";
  dis: "equiv" | "far" | "near";
}

interface GameGuessData {
  index: number;
  name: string;
  type: Array<GameGuessItemResult<string>>;
  ability: Array<GameGuessItemResult<string>>;
  color: GameGuessItemResult<string>;
  gen: GameGuessDistanceResult;
  stat: {
    pow: GameGuessDistanceResult;
  };
}
