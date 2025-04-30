import { Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { ResultIcon } from "./Icon";

export const PokemonBreeding = (props: PokemonItemProps) => {
  const { item } = props;
  const { t } = useTranslation("egg_groups");
  return (
    <div className="flex flex-col w-full items-center space-y-1">
      {item.breeding.egg_group.map((g, index) => (
        <Chip
          key={`${item.index}-${index}`}
          variant="flat"
          color={g.value ? "success" : "default"}
          className="flex justify-center items-center pixel-border pokemon-font text-xs"
        >
          <div className="flex items-center">
            <ResultIcon {...g} />
            <p className="w-12 truncate text-center dark:text-white chip-content">
              {t(g.key)}
            </p>
          </div>
        </Chip>
      ))}
    </div>
  );
};
