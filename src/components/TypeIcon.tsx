import React from 'react';

interface TypeIconProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  mono?: boolean;
}

// Map of Pokémon types to their traditional colors
const typeColors: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

// Map Chinese type names to English for SVG file names
const typeNameMap: Record<string, string> = {
  // Chinese to English mappings
  '一般': 'normal',
  '火': 'fire',
  '水': 'water',
  '电': 'electric',
  '草': 'grass',
  '冰': 'ice',
  '格斗': 'fighting',
  '毒': 'poison',
  '地面': 'ground',
  '飞行': 'flying',
  '超能力': 'psychic',
  '虫': 'bug',
  '岩石': 'rock',
  '幽灵': 'ghost',
  '龙': 'dragon',
  '恶': 'dark',
  '钢': 'steel',
  '妖精': 'fairy',
  // English names already match
  'normal': 'normal',
  'fire': 'fire',
  'water': 'water',
  'electric': 'electric',
  'grass': 'grass',
  'ice': 'ice',
  'fighting': 'fighting',
  'poison': 'poison',
  'ground': 'ground',
  'flying': 'flying',
  'psychic': 'psychic',
  'bug': 'bug',
  'rock': 'rock',
  'ghost': 'ghost',
  'dragon': 'dragon',
  'dark': 'dark',
  'steel': 'steel',
  'fairy': 'fairy'
};

const TypeIcon: React.FC<TypeIconProps> = ({
  type,
  className = '',
  size = 'md',
  mono = false
}) => {
  // Convert type name to lowercase and map to English
  const normalizedType = typeNameMap[type.toLowerCase()] || type.toLowerCase();

  // Icon sizing based on prop
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  // Create a proper path using dynamic imports
  const getIconPath = () => {
    try {
      // Use unpkg CDN URL (as shown in the docs)
      return `https://unpkg.com/@pokemonle/icons-svg@latest/icons/${normalizedType}${mono ? '-mono' : ''}.svg`;
    } catch (error) {
      console.error(`Failed to load icon for type: ${normalizedType}`, error);
      return ''; // Return empty if icon not found
    }
  };

  // Base styles for all icons including pixel-art aesthetic
  const baseClasses = `inline-block ${sizeClasses[size]} pixel-image`;

  // Combined class names
  const combinedClasses = `${baseClasses} ${className}`;

  // Get the background color for type or use a default
  const backgroundColor = typeColors[normalizedType] || '#CCC';

  return (
    <div
      className="inline-flex items-center justify-center rounded-full p-0.5"
      style={{
        backgroundColor: backgroundColor + '40' // Adding 40 for 25% opacity
      }}
    >
      <img
        src={getIconPath()}
        alt={`${type} type`}
        className={combinedClasses}
        style={{
          imageRendering: 'pixelated',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default TypeIcon;