import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 lg:py-8 flex justify-between w-full font-montserrat">
      <Link to="/">Bach or Bot</Link>
      <a
        href="https://github.com/krislette/bach-or-bot"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </div>
  );
}

export default Header;
