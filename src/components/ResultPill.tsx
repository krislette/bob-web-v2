import { Bot } from "lucide-react";

function ResultPill() {
  return (
    <div className="flex bg-red-custom p-4 w-64 justify-center border-2 border-red-light rounded-full">
      <Bot className="mr-2" size={32} />
      <h1 className="text-2xl">AI Generated</h1>
    </div>
  );
}

export default ResultPill;
