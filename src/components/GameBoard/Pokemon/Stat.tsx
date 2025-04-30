import { Chip } from "@heroui/react";
// import { useTranslation } from "react-i18next";
import { DistanceIcon } from "./Icon";
import useSettings from "../../../hooks/useSettings";
import { useTranslation } from "react-i18next";

const StatChip: React.FC<{
  item: GameGuessDistanceResult;
  className?: string;
  children: React.ReactNode;
}> = ({ item, children, className }) => (
  <Chip
    variant="flat"
    color={item.value === "equiv" ? "success" : "default"}
    className={`pixel-border pokemon-font text-xs ${className}`}
  >
    <div className="flex items-center w-full">
      <p className="dark:text-white chip-content flex-grow text-center">
        {children}
      </p>
      <DistanceIcon {...item} />
    </div>
  </Chip>
);

export const PokemonStat = (props: PokemonItemProps) => {
  const { settings } = useSettings();
  const { t } = useTranslation("stats");
  const { item } = props;
  //   const { t } = useTranslation("stats");
  return (
    <div className="min-w-40">
      <div className="grid grid-cols-2 gap-1 w-full">
        <div className="col-span-2 min-w-12">
          <StatChip className="min-w-full items-center" item={item.stat.pow}>
            <p>{item.stat.pow.key}</p>
          </StatChip>
        </div>
        {settings.stats &&
          item.stat.detail.map((stat, index) => (
            <StatChip className="min-w-full" key={index} item={stat}>
              <p className="min-w-6">{t(stat.identifier)}</p>
            </StatChip>
          ))}
      </div>
    </div>
  );
};
