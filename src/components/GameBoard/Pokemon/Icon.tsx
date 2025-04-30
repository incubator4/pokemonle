import { Image } from "@heroui/react";
import {
  DoubleArrowUpIcon,
  DoubleArrowDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

export const DistanceIcon = (props: GameGuessDistanceResult) => {
  const { dis, value } = props;

  if (dis === "equiv" && value === "equiv") {
    return <CheckCircledIcon />;
  }
  if (dis === "far") {
    return value === "high" ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />;
  }
  if (dis === "near") {
    return value === "high" ? <ChevronUpIcon /> : <ChevronDownIcon />;
  }
};

export const ResultIcon = <T,>(props: GameGuessItemResult<T>) => {
  return props.value ? <CheckCircledIcon /> : <CrossCircledIcon />;
};

interface MatchCoverProps {
  matched: boolean;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const MatchCover: React.FC<MatchCoverProps> = ({
  matched,
  backgroundColor,
  children,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full p-0.5 relative ${
        matched
          ? "bg-green-400 dark:bg-green-600 ring-2 ring-green-400 dark:ring-green-600"
          : ""
      }`}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

type IconSize = "sm" | "md" | "lg";

interface TypeIconProps {
  type: string;
  className?: string;
  size?: IconSize;
  mono?: boolean;
  matched?: boolean; // This will be used as a fallback if type isn't an object
}

// Map of Pokémon types to their traditional colors
const typeColors: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export const TypeIcon: React.FC<TypeIconProps> = ({
  type,
  className = "",
  size = "md",
  mono = false,
  matched = false,
}) => {
  // Icon sizing based on prop
  const sizeClasses: Record<IconSize, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Create a proper path using dynamic imports
  const getIconPath = () => {
    try {
      // Use unpkg CDN URL (as shown in the docs)
      return `https://unpkg.com/@pokemonle/icons-svg@latest/icons/${type}${
        mono ? "-mono" : ""
      }.svg`;
    } catch (error) {
      console.error(`Failed to load icon for type: ${type}`, error);
      return ""; // Return empty if icon not found
    }
  };

  // Base styles for all icons including pixel-art aesthetic
  const baseClasses = `inline-block ${sizeClasses[size]} pixel-image`;

  // Combined class names
  const combinedClasses = `${baseClasses} ${className}`;

  // Get the background color for type or use a default
  const backgroundColor = typeColors[type] || "#CCC";

  return (
    <MatchCover
      matched={matched}
      backgroundColor={!matched ? backgroundColor + "40" : undefined}
    >
      <Image
        src={getIconPath()}
        alt={`${type} type`}
        className={combinedClasses}
        style={{
          imageRendering: "pixelated",
          objectFit: "contain",
        }}
      />
    </MatchCover>
  );
};
