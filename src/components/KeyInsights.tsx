interface KeyInsightsProps {
  multimodalConfidence: number;
  audioOnlyConfidence: number;
  multimodalIsHigher: boolean;
}

function KeyInsights({
  multimodalConfidence,
  audioOnlyConfidence,
  multimodalIsHigher,
}: KeyInsightsProps) {
  const confidenceDiff = Math.abs(multimodalConfidence - audioOnlyConfidence);

  return (
    <div className="bg-black-darker p-6 rounded-xl space-y-3">
      <h3 className="text-lg font-semibold font-montserrat">Key Insights</h3>
      <ul className="space-y-2 text-sm list-disc list-inside text-gray-300">
        <li>
          {multimodalIsHigher ? (
            <>
              The Multimodal model demonstrated a significantly higher capacity
              for classification and processing of songs due to its ability to
              process both lyrics and audio features simultaneously.
            </>
          ) : (
            <>
              The Multimodal model, despite its ability to process both lyrics
              and audio features, showed lower confidence in this case,
              suggesting the lyrics may have introduced conflicting signals.
            </>
          )}
        </li>
        <li>
          In contrast, the Unimodal model, which relied solely on audio data,
          showed{audioOnlyConfidence > 80 ? " strong" : " moderate"} performance
          when semantic information embedded within lyrics was absent.
        </li>
        <li>
          Overall, the confidence difference of {confidenceDiff.toFixed(1)}%
          highlights the{" "}
          {multimodalIsHigher
            ? "strength of multimodal analysis in providing more robust predictions"
            : "effectiveness of audio-only analysis in this particular case"}
          .
        </li>
      </ul>
    </div>
  );
}

export default KeyInsights;
