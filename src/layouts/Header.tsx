import { SettingModal } from "../components/SettingModal";
import { ThemeSwitcher } from "../components/ThemeSwitch";
import pokeball from "../assets/pokeball.svg";

interface HeaderProps {
  title: string;
  image?: string;
}

export const Header = (props: HeaderProps) => {
  return (
    <header className="header-container">
      <nav className="px-4 lg:px-6 py-4 pixel-border pixel-shadow">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-3xl">
          <div className="flex items-center space-x-2">
            <img src={pokeball} alt="Pokeball" className="w-8 h-8" />
            <span className="self-center text-xl font-bold whitespace-nowrap pokemon-font">
              {props.title}
            </span>
          </div>

          <div className="flex items-center lg:order-2">
            <div className="flex items-center space-x-3">
              <ThemeSwitcher />
              <SettingModal />
            </div>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
};
