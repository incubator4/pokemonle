import { Tooltip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { TypeIcon } from "./Icon";

export const PokemonType = (props: PokemonItemProps) => {
  const { item } = props;
  const { t } = useTranslation("types");
  return (
    <div className="flex flex-row flex-wrap justify-center gap-2 p-1">
      {item.type.map((type, index) => (
        <Tooltip key={`${item.index}-${index}`} content={t(type.key)}>
          <div className={`${type.value ? "scale-110" : "opacity-70"}`}>
            <TypeIcon
              type={type.key}
              matched={type.value}
              size="md"
              className={`pixel-image ${type.value ? "type-matched" : ""}`}
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
