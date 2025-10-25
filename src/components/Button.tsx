import { useLocation } from "react-router-dom";

// Props for button component
interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function Button({ onClick, disabled }: ButtonProps) {
  const location = useLocation();

  return (
    <button
      className={`w-full p-3 sm:p-4 rounded-lg ${
        disabled
          ? "bg-gray-600 text-gray-200 cursor-not-allowed"
          : "bg-blue-custom text-white-custom hover:bg-blue-custom/80 cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Analyze {location.pathname === "/" ? "" : "Another"} Music
    </button>
  );
}

export default Button;
