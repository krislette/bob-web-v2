import ConfidenceComparison from "./ConfidenceComparison";
import TopFactors from "./TopFactors";
import FinalVerdict from "./FinalVerdict";
import KeyInsights from "./KeyInsights";
import { adjustConfidenceScore } from "../utils/confidenceAdjuster";

interface ComparisonSummaryProps {
  multimodal: {
    prediction: any;
    explanation: any;
  };
  audioOnly: {
    prediction: any;
    explanation: any;
  };
  fileName: string;
}

function ComparisonSummary({
  multimodal,
  audioOnly,
  fileName,
}: ComparisonSummaryProps) {
  // Get raw confidence
  const rawMultimodalConfidence = multimodal.prediction?.confidence || 0;
  const rawAudioOnlyConfidence = audioOnly.prediction?.confidence || 0;

  // Apply adjustment function
  const multimodalConfidence = adjustConfidenceScore(
    rawMultimodalConfidence,
    97
  );
  const audioOnlyConfidence = adjustConfidenceScore(rawAudioOnlyConfidence, 97);

  const multimodalClass = multimodal.prediction?.label || "Unknown";
  const audioOnlyClass = audioOnly.prediction?.label || "Unknown";
  const multimodalTopFeature = multimodal.explanation?.explanations?.[0];
  const audioOnlyTopFeature = audioOnly.explanation?.explanations?.[0];

  // Determine which model has higher confidence
  const multimodalIsHigher = multimodalConfidence >= audioOnlyConfidence;

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center mt-6 space-y-8">
      <h2 className="text-2xl md:text-3xl font-montserrat font-[600]">
        Comparison Summary
      </h2>

      {/* Top row: Confidence and Top Factors */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfidenceComparison
          multimodalConfidence={multimodalConfidence}
          audioOnlyConfidence={audioOnlyConfidence}
          multimodalIsHigher={multimodalIsHigher}
        />
        <TopFactors
          multimodalTopFeature={multimodalTopFeature}
          audioOnlyTopFeature={audioOnlyTopFeature}
          multimodalIsHigher={multimodalIsHigher}
        />
      </div>

      {/* Bottom row: Final Verdict and Key Insights */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinalVerdict
          multimodalClass={multimodalClass}
          audioOnlyClass={audioOnlyClass}
          multimodalConfidence={multimodalConfidence}
          audioOnlyConfidence={audioOnlyConfidence}
          fileName={fileName}
          multimodalIsHigher={multimodalIsHigher}
        />
        <KeyInsights
          multimodalConfidence={multimodalConfidence}
          audioOnlyConfidence={audioOnlyConfidence}
          multimodalIsHigher={multimodalIsHigher}
        />
      </div>
    </div>
  );
}

export default ComparisonSummary;
