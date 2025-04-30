interface GameGuessData {
  index: number;
  identifier: string;
  type: Array<GameGuessItemResult<string>>;
  ability: Array<GameGuessItemResult<string>>;
  color: GameGuessItemResult<string>;
  gen: GameGuessDistanceResult;
  stat: {
    pow: GameGuessDistanceResult;
    detail: Array<GameGuessDistanceResult>;
  };
  breeding: {
    egg_group: Array<GameGuessItemResult<string>>;
    capture_rate: GameGuessDistanceResult;
  };
}
