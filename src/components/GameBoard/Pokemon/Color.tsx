import { Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { CheckIcon, ErrorIcon } from "./Icon";

const cssMap: Record<string, string> = {
  black: "bg-black",
  blue: "bg-blue-500",
  brown: "bg-[#8B4513]",
  gray: "bg-gray-500",
  green: "bg-green-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  white: "bg-white",
  yellow: "bg-yellow-500",
};

export const PokemonColor: React.FC<PokemonItemProps> = (
  props: PokemonItemProps
) => {
  const { t } = useTranslation("pokemon_colors");
  const { item } = props;

  const textClass =
    item.color.key === "white" ? "text-black dark:text-black" : "text-white";

  return (
    <Chip
      variant="flat"
      className={`pixel-border pokemon-font text-xs`}
      classNames={{ base: cssMap[item.color.key] }}
    >
      <div className={`flex items-center space-x-2 ${textClass}`}>
        {item.color.value ? <CheckIcon /> : <ErrorIcon />}
        <div className={textClass}>{t(item.color.key)}</div>
      </div>
    </Chip>
  );
};
