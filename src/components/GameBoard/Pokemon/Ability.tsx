import { Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";

export const PokemonAbility = (props: PokemonItemProps) => {
  const { item } = props;
  const { t } = useTranslation("abilities");
  return (
    <div className="flex flex-col w-full items-center space-y-1">
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
};
