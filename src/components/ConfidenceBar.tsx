// Props for the confidence bar component
interface ConfidenceBarProps {
  percentage: number;
  label?: string;
  classification?: string;
}

function ConfidenceBar({
  percentage,
  label,
  classification,
}: ConfidenceBarProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-300">{label}</span>
          <span className="text-white font-semibold">{percentage}%</span>
        </div>
      )}

      {/* Progress bar color changes, which depends on the classification as well */}
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            classification === "AI-Generated"
              ? percentage >= 70
                ? "bg-red-500"
                : percentage >= 40
                ? "bg-yellow-500"
                : "bg-green-500"
              : percentage >= 70
              ? "bg-green-500"
              : percentage >= 40
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ConfidenceBar;
