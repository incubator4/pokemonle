import { Chip } from "@heroui/react";
// import { useTranslation } from "react-i18next";
import { UpArrow, DownArrow, CheckIcon } from "./Icon";

export const PokemonStat = (props: PokemonItemProps) => {
  const { item } = props;
  //   const { t } = useTranslation("stats");
  return (
    <Chip
      variant="flat"
      color={item.stat.pow.value === "equiv" ? "success" : "default"}
      className="pixel-border pokemon-font text-xs"
    >
      <div className="flex items-center space-x-2">
        <p className="dark:text-white chip-content">{item.stat.pow.key}</p>
        {item.stat.pow.value !== "equiv" ? (
          <>{item.stat.pow.value === "high" ? <UpArrow /> : <DownArrow />}</>
        ) : (
          <CheckIcon />
        )}
      </div>
    </Chip>
  );
};
