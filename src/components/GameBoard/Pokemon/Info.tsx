import { User } from "@heroui/react";
import { useTranslation } from "react-i18next";

export const PokemonInfo = (props: PokemonItemProps) => {
  const { item } = props;
  const { t } = useTranslation(["pokemon_species"]);
  return (
    <User
      name={
        <p className="w-20 pokemon-font text-xs dark:text-white">
          {t(item.identifier)}
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
};
