import { Chip } from "@heroui/react";

const cssMap: Record<string, Array<string>> = {
  black: ["bg-black", "text-white"],
  blue: ["bg-blue-300", "text-black"],
  brown: ["bg-[#8B4513]", "text-white"],
  gray: ["bg-gray-300", "text-black"],
  green: ["bg-green-300", "text-black"],
  pink: ["bg-pink-300", "text-black"],
  purple: ["bg-purple-300", "text-white"],
  red: ["bg-red-300", "text-black"],
  white: ["bg-white", "text-black"],
  yellow: ["bg-yellow-300", "text-black"],
};

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

interface ColorIconProps {
  item: GameGuessItemResult<string>;
}

const ColorIcon: React.FC<ColorIconProps> = (props: ColorIconProps) => {
  const { item } = props;
  return (
    <Chip
      variant="flat"
      className={`pixel-border pokemon-font text-xs`}
      classNames={{ base: cssMap[item.key] }}
    >
      <div className="flex items-center space-x-2">
        <p className="dark:text-white chip-content">{item.key}</p>
        {item.value ? <CheckIcon /> : <></>}
      </div>
    </Chip>
  );
};

export default ColorIcon;
