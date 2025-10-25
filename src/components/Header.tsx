import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 lg:py-8 flex justify-between w-full font-montserrat text-gray-900 dark:text-white">
      <Link to="/">Bach or Bot</Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <a
          href="https://github.com/krislette/bach-or-bot"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Header;
