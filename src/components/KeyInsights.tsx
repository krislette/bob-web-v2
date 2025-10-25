interface KeyInsightsProps {
  multimodalConfidence: number;
  audioOnlyConfidence: number;
}

function KeyInsights({
  multimodalConfidence,
  audioOnlyConfidence,
}: KeyInsightsProps) {
  const confidenceDiff = Math.abs(multimodalConfidence - audioOnlyConfidence);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Key Insights</h3>
      <ul className="space-y-2 text-sm list-disc list-inside text-gray-300">
        <li>
          The Multimodal model demonstrated a{" "}
          {multimodalConfidence > audioOnlyConfidence
            ? "significantly higher"
            : "lower"}{" "}
          capacity for classification and processing of songs due to its ability
          to process both lyrics and audio features simultaneously.
        </li>
        <li>
          In contrast, the Unimodal model, which relied solely on audio data,
          showed
          {audioOnlyConfidence > 0.8 ? " strong" : " moderate"} performance when
          semantic information embedded within lyrics was absent.
        </li>
        <li>
          Overall, the confidence difference of{" "}
          {(confidenceDiff * 100).toFixed(1)}% highlights the strength of
          multimodal analysis in providing more robust predictions.
        </li>
      </ul>
    </div>
  );
}

export default KeyInsights;
