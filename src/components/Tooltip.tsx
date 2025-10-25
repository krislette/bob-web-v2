import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface TooltipProps {
  content: string;
  className?: string;
}

function Tooltip({ content, className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      iconRef.current &&
      !iconRef.current.contains(e.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isVisible]);

  const parseContent = (text: string) => {
    return text.split("\n\n").map((paragraph, idx) => {
      // Check if paragraph starts with **text**
      const boldMatch = paragraph.match(/^\*\*(.*?)\*\*/);
      if (boldMatch) {
        const boldText = boldMatch[1];
        const restText = paragraph.substring(boldMatch[0].length).trim();
        return (
          <div key={idx} className="space-y-1">
            <strong className="font-semibold text-white block">
              {boldText}
            </strong>
            {restText && (
              <span className="block text-gray-300">{restText}</span>
            )}
          </div>
        );
      }

      // Handle bullet points with dashes
      if (paragraph.trim().startsWith("-")) {
        const items = paragraph.split("\n").filter((line) => line.trim());
        return (
          <ul key={idx} className="space-y-1.5 ml-2">
            {items.map((item, i) => (
              <li key={i} className="text-gray-300 flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>{item.replace("-", "").trim()}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-gray-300">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Info Icon Button */}
      <button
        ref={iconRef}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-black-darker dark:hover:bg-black-dark-blue transition-colors duration-200 ml-2 cursor-pointer"
        aria-label="More information"
        type="button"
      >
        <Info className="w-3.5 h-3.5 text-black-dark hover:text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" />
      </button>

      {/* Tooltip Content */}
      {isVisible && (
        <div className="relative">
          <div
            ref={tooltipRef}
            className="absolute z-50 w-96 max-h-96 overflow-y-auto px-5 py-4 text-xs bg-black-dark border border-gray-700 rounded-lg shadow-2xl right-0 top-full mt-2"
            style={{
              animation: "fadeIn 0.2s ease-out",
              scrollbarWidth: "thin",
              scrollbarColor: "#4B5563 #1f1f1e",
            }}
          >
            {/* Content */}
            <div className="relative z-10 leading-relaxed text-left space-y-3">
              {parseContent(content)}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Tooltip;
