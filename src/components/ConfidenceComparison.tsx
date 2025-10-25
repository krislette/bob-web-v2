interface ConfidenceComparisonProps {
  multimodalConfidence: number;
  audioOnlyConfidence: number;
}

function ConfidenceComparison({
  multimodalConfidence,
  audioOnlyConfidence,
}: ConfidenceComparisonProps) {
  const confidenceDiff = Math.abs(multimodalConfidence - audioOnlyConfidence);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Confidence Comparison</h3>

      {/* Multimodal bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Multimodal</span>
          <span>{(multimodalConfidence * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${multimodalConfidence * 100}%` }}
          />
        </div>
      </div>

      {/* Unimodal bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Unimodal</span>
          <span>{(audioOnlyConfidence * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${audioOnlyConfidence * 100}%` }}
          />
        </div>
      </div>

      {/* Comparison text */}
      <p className="text-sm text-gray-300">
        Multimodal shows a {(confidenceDiff * 100).toFixed(1)}%{" "}
        {multimodalConfidence > audioOnlyConfidence ? "higher" : "lower"}{" "}
        confidence than unimodal.
      </p>
    </div>
  );
}

export default ConfidenceComparison;
