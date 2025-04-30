import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Key, useCallback, useMemo } from "react";
import { columns } from "./column";
import {
  PokemonInfo,
  PokemonAbility,
  PokemonType,
  PokemonGeneration,
  PokemonStat,
  PokemonColor,
  PokemonBreeding,
} from "./Pokemon";
import useSettings from "../../hooks/useSettings";

interface GameCardProps {
  items: Array<GameGuessData>;
}

const GameBoard = (props: GameCardProps) => {
  const { settings } = useSettings();

  const cols = useMemo(() => {
    return columns.filter((col) => {
      // Hide breeding column if breeding is disabled
      if (col.key === "breeding") {
        return settings.breeding;
      }
      if (col.key === "color") {
        return settings.shape;
      }
      return true;
    });
  }, [settings]);

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
        return value as number;
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
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={props.items}>
          {(item: GameGuessData) => (
            <TableRow
              key={`${item.index}-${props.items.findIndex((i) => i === item)}`}
              className="pixel-border"
            >
              {(columnKey) => (
                <TableCell align="center" className="pixel-border">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default GameBoard;
