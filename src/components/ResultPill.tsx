import { Bot, UserRoundCheck } from "lucide-react";

// Props for the result pill component
interface ResultPillProps {
  classification?: string;
}

function ResultPill({ classification }: ResultPillProps) {
  return (
    <div
      className={`flex p-4 w-84 justify-center border-2 rounded-full ${
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
      <h1 className="text-2xl">
        {classification === "AI-Generated" ? "AI-Generated" : "Human-Composed"}
      </h1>
    </div>
  );
}

export default ResultPill;
