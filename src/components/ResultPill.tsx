import { Bot, UserRoundCheck } from "lucide-react";

// Props for the result pill component
interface ResultPillProps {
  classification?: string;
}

function ResultPill({ classification }: ResultPillProps) {
  return (
    <div
      className={`flex p-3 sm:p-4 w-full max-w-xs sm:max-w-sm md:max-w-md justify-center border-2 rounded-full text-white-custom ${
        classification === "AI-Generated"
          ? "bg-red-custom border-red-light"
          : "bg-green-custom border-green-light"
      }`}
    >
      {classification === "AI-Generated" ? (
        <Bot className="mr-2" size={32} />
      ) : (
        <UserRoundCheck className="mr-2" size={32} />
      )}
      <h1 className="text-lg sm:text-xl md:text-2xl font-montserrat">
        {classification === "AI-Generated" ? "AI-Generated" : "Human-Composed"}
      </h1>
    </div>
  );
}

export default ResultPill;
