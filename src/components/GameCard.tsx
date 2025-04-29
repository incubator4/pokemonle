import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  Tooltip,
} from "@heroui/react";
import { Key, useCallback } from "react";
import TypeIcon from "./TypeIcon";
import ColorIcon from "./ColorIcon";
import { useTranslation } from "react-i18next";

interface GameCardProps {
  items: Array<GameGuessData>;
}

const columns = [
  { key: "index", label: "宝可梦" },
  { key: "type", label: "属性" },
  { key: "gen", label: "世代" },
  { key: "ability", label: "特性" },
  { key: "stat", label: "种族值" },
  { key: "color", label: "颜色" },
];

const UpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);

const DownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const GameCard = (props: GameCardProps) => {
  const { t } = useTranslation(["types", "abilities", "pokemon_species"]);

  const renderCell = useCallback((item: GameGuessData, key: Key) => {
    const value = item[key as keyof GameGuessData];

    switch (key) {
      case "index":
        return (
          <User
            name={
              <p className="w-20 pokemon-font text-xs dark:text-white">
                {t(item.identifier, { ns: "pokemon_species" })}
              </p>
            }
            avatarProps={{
              radius: "sm",
              size: "lg",
              src: `https://pokeimg.oss-cn-beijing.aliyuncs.com/pokemon_images/${item.index}.webp`,
              className: "pixel-border",
            }}
          >
            <p className="w-20 pokemon-font text-xs dark:text-white">
              {item.identifier}
            </p>
          </User>
        );
      case "type":
        return (
          <div className="flex flex-row flex-wrap justify-center gap-2 p-1">
            {item.type.map((type, index) => (
              <Tooltip
                key={`${item.index}-${index}`}
                content={t(type.key, { ns: "types" })}
              >
                <div className={`${type.value ? "scale-110" : "opacity-70"}`}>
                  <TypeIcon
                    type={type.key}
                    matched={type.value}
                    size="md"
                    className={`pixel-image ${
                      type.value ? "type-matched" : ""
                    }`}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        );

      case "ability":
        return (
          <div className="flex flex-col w-full space-y-1">
            {item.ability.map((a, index) => {
              return (
                <Chip
                  key={`${item.index}-${index}`}
                  variant="flat"
                  color={a.value ? "success" : "default"}
                  className="flex justify-center items-center pixel-border pokemon-font text-xs"
                >
                  <p className="w-16 truncate text-center dark:text-white chip-content">
                    {t(a.key, { ns: "abilities" })}
                  </p>
                </Chip>
              );
            })}
          </div>
        );
      case "gen":
        return (
          <Chip
            variant="flat"
            color={item.gen.value === "equiv" ? "success" : "default"}
            className="pixel-border pokemon-font text-xs"
          >
            <div className="flex items-center space-x-2">
              <p className="dark:text-white chip-content">{item.gen.key}</p>
              {item.gen.value !== "equiv" ? (
                <>{item.gen.value === "high" ? <UpArrow /> : <DownArrow />}</>
              ) : (
                <CheckIcon />
              )}
            </div>
          </Chip>
        );
      case "color":
        return <ColorIcon item={item.color} />;
      case "stat":
        return (
          <Chip
            variant="flat"
            color={item.stat.pow.value === "equiv" ? "success" : "default"}
            className="pixel-border pokemon-font text-xs"
          >
            <div className="flex items-center space-x-2">
              <p className="dark:text-white chip-content">
                {item.stat.pow.key}
              </p>
              {item.stat.pow.value !== "equiv" ? (
                <>
                  {item.stat.pow.value === "high" ? <UpArrow /> : <DownArrow />}
                </>
              ) : (
                <CheckIcon />
              )}
            </div>
          </Chip>
        );
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
        <TableHeader columns={columns}>
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

export default GameCard;
