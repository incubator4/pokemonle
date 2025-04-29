import { useEffect, useState, useRef } from "react";
import { SearchBar, SearchBarRef } from "./SearchBar";
import { Button, addToast } from "@heroui/react";
import GameCard from "./GameBoard";
import { GameInit, GameGuess } from "../api/game";
import { useEncodeGeneration } from "../hooks/useGeneration";
import pokeball from "../assets/pokeball.svg";

export const Game = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(
    undefined
  );
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [isFinished, setFinished] = useState(false);
  const [compareList, setCompareList] = useState<Array<GameGuessData>>([]);
  const [restartCount, setRestartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const searchBarRef = useRef<SearchBarRef>(null);

  const { data: encodeGeneration } = useEncodeGeneration();

  useEffect(() => {
    GameInit(encodeGeneration).then(setAnswer);
  }, [encodeGeneration, restartCount]);

  const handleSearchChange = (value: string) => {
    setSelectedPokemon(value);
  };

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  const resetSelection = () => {
    setSelectedPokemon(undefined);
    setSearchQuery("");
    // Force reset the search bar
    if (searchBarRef.current) {
      searchBarRef.current.resetSearchBar();
    }
  };

  const handleRestart = () => {
    setFinished(false);
    setCompareList([]);
    resetSelection();
    setAnswer(undefined);

    setRestartCount((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center m-4">
        <div className="w-full mb-8">
          <SearchBar
            value={selectedPokemon}
            onChange={handleSearchChange}
            onInputChange={handleSearchQueryChange}
            inputValue={searchQuery}
            ref={searchBarRef}
          />
        </div>

        <div
          id="button-group"
          className="flex w-full mx-auto justify-center space-x-4 mb-8"
        >
          <Button
            color="primary"
            className="w-32 h-12 pixel-button pixel-button-primary pixel-corners pokemon-font"
            isDisabled={!selectedPokemon || isFinished}
            onPress={() => {
              if (answer && selectedPokemon) {
                const selectIndex: number = parseInt(selectedPokemon);
                GameGuess(answer, selectIndex).then((res) => {
                  console.log(res);
                  if (res.index === answer) {
                    setFinished(true);
                    addToast({
                      title: "恭喜你！",
                      description: "你猜对了！",
                      color: "success",
                      timeout: 2000,
                    });
                  }
                  setCompareList((prev) => [...prev, res]);
                  resetSelection();
                });
              }
            }}
          >
            <div className="flex items-center justify-center">
              <img src={pokeball} alt="Pokeball" className="w-5 h-5 mr-2" />
              提交
            </div>
          </Button>
          <Button
            isDisabled={isFinished}
            color="danger"
            className="w-32 h-12 pixel-button pixel-button-danger pixel-corners pokemon-font"
            onPress={() => {
              if (answer) {
                GameGuess(answer, answer).then((res) => {
                  console.log(res);
                  if (res.index === answer) {
                    setFinished(true);
                    addToast({
                      title: "已投降！",
                      description: "胜败乃兵家常事,请重新来过！",
                      color: "warning",
                      timeout: 2000,
                    });
                  }
                  setCompareList((prev) => [...prev, res]);
                  resetSelection();
                });
              }
            }}
          >
            投降
          </Button>
          <Button
            color="success"
            onPress={handleRestart}
            className="w-32 h-12 pixel-button pixel-button-success pixel-corners pokemon-font"
          >
            重开
          </Button>
        </div>

        {compareList.length > 0 && (
          <div className="w-full pokemon-table-container">
            <div className="pixel-divider mb-4"></div>
            <GameCard items={compareList} />
          </div>
        )}
      </div>
    </>
  );
};
