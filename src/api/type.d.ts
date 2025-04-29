interface GameGuessItemResult<T> {
  key: T;
  value: boolean;
  id?: number;
}

interface GameGuessDistanceResult {
  key: number;
  identifier: string;
  value: "equiv" | "high" | "low";
  dis: "equiv" | "far" | "near";
}
