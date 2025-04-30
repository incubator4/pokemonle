import { Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { DistanceIcon } from "./Icon";
import { useWindowSize } from "usehooks-ts";

export const PokemonGeneration = (props: PokemonItemProps) => {
  const { item } = props;
  const { t } = useTranslation("generations");
  const { width } = useWindowSize();
  return (
    <Chip
      variant="flat"
      color={item.gen.value === "equiv" ? "success" : "default"}
      className="pixel-border pokemon-font text-xs"
    >
      <div className="flex items-center space-x-2 ">
        <p className="dark:text-white chip-content">
          {width > 640 ? t(item.gen.identifier) : `GEN ${item.gen.key}`}
        </p>
        <DistanceIcon {...item.gen} />
      </div>
    </Chip>
  );
};
