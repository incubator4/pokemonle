import { Game } from "../components/Game";

export const Body = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
      <div className="pixel-card pixel-border pixel-shadow p-4 mb-8 h-full">
        <Game />
      </div>
    </div>
  );
};
