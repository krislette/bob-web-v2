import ConfidenceComparison from "./ConfidenceComparison";
import TopFactors from "./TopFactors";
import FinalVerdict from "./FinalVerdict";
import KeyInsights from "./KeyInsights";

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
  const multimodalConfidence = multimodal.prediction?.confidence || 0;
  const audioOnlyConfidence = audioOnly.prediction?.confidence || 0;
  const multimodalClass = multimodal.prediction?.label || "Unknown";
  const audioOnlyClass = audioOnly.prediction?.label || "Unknown";
  const multimodalTopFeature = multimodal.explanation?.explanations?.[0];
  const audioOnlyTopFeature = audioOnly.explanation?.explanations?.[0];

  return (
    <div className="bg-black-darker flex flex-col items-center p-6 md:p-8 rounded-xl mt-6 space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold">Comparison Summary</h2>

      {/* Top row: Confidence and Top Factors */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfidenceComparison
          multimodalConfidence={multimodalConfidence}
          audioOnlyConfidence={audioOnlyConfidence}
        />
        <TopFactors
          multimodalTopFeature={multimodalTopFeature}
          audioOnlyTopFeature={audioOnlyTopFeature}
        />
      </div>

      {/* Bottom row: Final Verdict and Key Insights */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
        <FinalVerdict
          multimodalClass={multimodalClass}
          audioOnlyClass={audioOnlyClass}
          multimodalConfidence={multimodalConfidence}
          audioOnlyConfidence={audioOnlyConfidence}
          fileName={fileName}
        />
        <KeyInsights
          multimodalConfidence={multimodalConfidence}
          audioOnlyConfidence={audioOnlyConfidence}
        />
      </div>
    </div>
  );
}

export default ComparisonSummary;
