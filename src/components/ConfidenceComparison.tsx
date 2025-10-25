interface ConfidenceComparisonProps {
  multimodalConfidence: number; // Now expects 0-100
  audioOnlyConfidence: number; // Now expects 0-100
  multimodalIsHigher: boolean;
}

function ConfidenceComparison({
  multimodalConfidence,
  audioOnlyConfidence,
  multimodalIsHigher,
}: ConfidenceComparisonProps) {
  const confidenceDiff = Math.abs(multimodalConfidence - audioOnlyConfidence);

  // Determine order based on confidence
  const firstModel = multimodalIsHigher ? "Multimodal" : "Unimodal";
  const firstConfidence = multimodalIsHigher
    ? multimodalConfidence
    : audioOnlyConfidence;
  const secondModel = multimodalIsHigher ? "Unimodal" : "Multimodal";
  const secondConfidence = multimodalIsHigher
    ? audioOnlyConfidence
    : multimodalConfidence;

  return (
    <div className="bg-black-darker p-6 rounded-xl space-y-4">
      <h3 className="text-lg font-semibold font-montserrat">
        Confidence Comparison
      </h3>

      {/* First model (higher confidence) */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{firstModel}</span>
          <span>{firstConfidence.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${firstConfidence}%` }}
          />
        </div>
      </div>

      {/* Second model (lower confidence) */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{secondModel}</span>
          <span>{secondConfidence.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${secondConfidence}%` }}
          />
        </div>
      </div>

      {/* Comparison text */}
      <p className="text-sm text-gray-300">
        {firstModel} shows a {confidenceDiff.toFixed(1)}% higher confidence than{" "}
        {secondModel.toLowerCase()}.
      </p>
    </div>
  );
}

export default ConfidenceComparison;
