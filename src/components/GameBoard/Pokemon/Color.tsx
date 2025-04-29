import { Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "./Icon";

const cssMap: Record<string, Array<string>> = {
  black: ["bg-black", "text-white"],
  blue: ["bg-blue-500", "text-white"],
  brown: ["bg-[#8B4513]", "text-white"],
  gray: ["bg-gray-500", "text-white"],
  green: ["bg-green-500", "text-white"],
  pink: ["bg-pink-500", "text-white"],
  purple: ["bg-purple-500", "text-white"],
  red: ["bg-red-500", "text-white"],
  white: ["bg-white", "text-black"],
  yellow: ["bg-yellow-500", "text-black"],
};

export const PokemonColor: React.FC<PokemonItemProps> = (
  props: PokemonItemProps
) => {
  const { t } = useTranslation("pokemon_colors");
  const { item } = props;
  return (
    <Chip
      variant="flat"
      className={`pixel-border pokemon-font text-xs`}
      classNames={{ base: cssMap[item.color.key] }}
    >
      <div className="flex items-center space-x-2">
        {item.color.value ? <CheckIcon /> : <></>}
        <p className="dark:text-white chip-content">{t(item.color.key)}</p>
      </div>
    </Chip>
  );
};
