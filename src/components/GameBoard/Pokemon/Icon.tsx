import { Image } from "@heroui/react";

export const UpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);

export const DownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" />
  </svg>
);

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
        matched ? "bg-green-700 ring-2 ring-green-500" : ""
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
