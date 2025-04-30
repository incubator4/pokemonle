import { User } from "@heroui/react";
import { useTranslation } from "react-i18next";

const image_host =
  import.meta.env.VITE_IMAGE_BASE_URL ||
  "https://image.pokemonle.incubator4.com";

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
        src: `${image_host}/pokemon/${item.index}.webp`,
        className: "pixel-border",
      }}
    >
      <p className="w-20 pokemon-font text-xs dark:text-white">
        {item.identifier}
      </p>
    </User>
  );
};
