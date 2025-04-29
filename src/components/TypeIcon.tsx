import React from 'react';

interface TypeData {
  key: string;
  value: boolean;
}

interface TypeIconProps {
  type: string | TypeData;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  mono?: boolean;
  matched?: boolean; // This will be used as a fallback if type isn't an object
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

const TypeIcon: React.FC<TypeIconProps> = ({
  type,
  className = '',
  size = 'md',
  mono = false,
  matched = false
}) => {
  // Check if type is an object with key/value or just a string
  const isTypeObject = typeof type === 'object' && type !== null;

  // Get the actual type name and match status
  const typeName = isTypeObject ? (type as TypeData).key : type as string;
  const isMatched = isTypeObject ? (type as TypeData).value : matched;

  // Use type directly as it's already in English
  const normalizedType = typeName.toLowerCase();

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
      className={`inline-flex items-center justify-center rounded-full p-0.5 relative ${isMatched ? 'ring-2 ring-green-500 ring-offset-1' : ''}`}
      style={{
        backgroundColor: backgroundColor + '40' // Adding 40 for 25% opacity
      }}
    >
      <img
        src={getIconPath()}
        alt={`${typeName} type`}
        className={combinedClasses}
        style={{
          imageRendering: 'pixelated',
          objectFit: 'contain'
        }}
      />
      {isMatched && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: 'rgba(74, 222, 128, 0.3)',
            zIndex: 10
          }}
        />
      )}
    </div>
  );
};

export default TypeIcon;