import { Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { UpArrow, DownArrow, CheckIcon } from "./Icon";

export const PokemonGeneration = (props: PokemonItemProps) => {
  const { item } = props;
  const { t } = useTranslation("generations");
  return (
    <Chip
      variant="flat"
      color={item.gen.value === "equiv" ? "success" : "default"}
      className="pixel-border pokemon-font text-xs"
    >
      <div className="flex items-center space-x-2">
        <p className="dark:text-white chip-content">{t(item.gen.identifier)}</p>
        {item.gen.value !== "equiv" ? (
          <>{item.gen.value === "high" ? <UpArrow /> : <DownArrow />}</>
        ) : (
          <CheckIcon />
        )}
      </div>
    </Chip>
  );
};
