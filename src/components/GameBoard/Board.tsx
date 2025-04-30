import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Key, useCallback, useMemo } from "react";
import {
  PokemonInfo,
  PokemonAbility,
  PokemonType,
  PokemonGeneration,
  PokemonStat,
  PokemonColor,
  PokemonBreeding,
  PokemonSummary,
} from "./Pokemon";
import useSettings from "../../hooks/useSettings";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "usehooks-ts";

interface GameCardProps {
  items: Array<GameGuessData>;
}

const GameBoard = (props: GameCardProps) => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const cols = useMemo(() => {
    const columns = [
      { key: "index", label: "pokemon" },
      { key: "type", label: "pokemon_type" },
      { key: "gen", label: "generation" },
      { key: "ability", label: "ability" },
      { key: "stat", label: "stat" },
      { key: "color", label: "color" },
      { key: "breeding", label: "breeding" },
    ];

    // Hide columns based on screen size

    return isMobile
      ? [columns[0], { key: "summary", label: "summary" }]
      : columns.filter((col) => {
          // Hide breeding column if breeding is disabled
          if (col.key === "breeding") {
            return settings.breeding;
          }
          if (col.key === "color") {
            return settings.shape;
          }
          return true;
        });
  }, [settings, isMobile]);

  const renderCell = useCallback((item: GameGuessData, key: Key) => {
    const value = item[key as keyof GameGuessData];
    switch (key) {
      case "index":
        return <PokemonInfo item={item} />;
      case "type":
        return <PokemonType item={item} />;
      case "ability":
        return <PokemonAbility item={item} />;
      case "gen":
        return <PokemonGeneration item={item} />;
      case "color":
        return <PokemonColor item={item} />;
      case "stat":
        return <PokemonStat item={item} />;
      case "breeding":
        return <PokemonBreeding item={item} />;
      default:
        return <p>{value as number}</p>;
    }
  }, []);

  return (
    <>
      <Table
        aria-label="pokemon compare table"
        className="pokemon-table pixel-border"
        classNames={{
          th: "pokemon-font text-xs text-center dark:text-white",
          td: "text-center",
        }}
      >
        <TableHeader columns={cols}>
          {(column) => (
            <TableColumn
              key={column.key}
              align="center"
              className="capitalize pixel-border"
            >
              {t(column.label)}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={props.items}>
          {(item: GameGuessData) =>
            isMobile ? (
              <TableRow key={`${item.index}`}>
                <TableCell align="center" className="pixel-border">
                  {renderCell(item, "index")}
                </TableCell>
                <TableCell align="center" className="pixel-border">
                  <div>
                    <PokemonSummary item={item} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow
                key={`${item.index}-${props.items.findIndex(
                  (i) => i === item
                )}`}
                className="pixel-border"
              >
                {(columnKey) => (
                  <TableCell align="center" className="pixel-border">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </>
  );
};

export default GameBoard;
