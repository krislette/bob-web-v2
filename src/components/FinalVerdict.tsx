import { CheckCircle2, AlertTriangle } from "lucide-react";

interface FinalVerdictProps {
  multimodalClass: string;
  audioOnlyClass: string;
  multimodalConfidence: number;
  audioOnlyConfidence: number;
  fileName: string;
  multimodalIsHigher: boolean;
}

function FinalVerdict({
  multimodalClass,
  audioOnlyClass,
  multimodalConfidence,
  audioOnlyConfidence,
  fileName,
  multimodalIsHigher,
}: FinalVerdictProps) {
  const sameClassification = multimodalClass === audioOnlyClass;

  const VerdictItem = ({
    type,
    children,
  }: {
    type: "success" | "warning";
    children: React.ReactNode;
  }) => {
    const Icon = type === "success" ? CheckCircle2 : AlertTriangle;
    const iconColor = type === "success" ? "text-green-400" : "text-yellow-400";
    const bgColor = type === "success" ? "bg-green-500/20" : "bg-yellow-500/20";

    return (
      <div className="flex items-start space-x-3">
        <div className={`${bgColor} p-1.5 rounded-full flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <p className="text-sm text-gray-700 dark:text-white">{children}</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-black-darker p-6 rounded-xl space-y-3">
      <h3 className="text-lg font-semibold font-montserrat text-gray-900 dark:text-white">
        Final Verdict
      </h3>

      {sameClassification ? (
        <>
          <VerdictItem type="success">
            The Multimodal model correctly identified the song "{fileName}" as{" "}
            {multimodalClass} with a {multimodalConfidence.toFixed(1)}%
            confidence score.
          </VerdictItem>
          <VerdictItem type="success">
            The Unimodal model also classified it as {audioOnlyClass} but with a{" "}
            {audioOnlyConfidence > multimodalConfidence ? "higher" : "lower"}{" "}
            {audioOnlyConfidence.toFixed(1)}% confidence.
          </VerdictItem>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            {multimodalIsHigher
              ? "Both models arrived at the correct classification; however, the multimodal model demonstrated stronger confidence and deeper contextual understanding."
              : "Both models arrived at the correct classification. The unimodal model showed higher confidence, while the multimodal model provided additional contextual insights from lyrics analysis."}
          </p>
        </>
      ) : (
        <>
          <VerdictItem type="warning">
            The models disagree: Multimodal classified as {multimodalClass} (
            {multimodalConfidence.toFixed(1)}%) while Unimodal classified as{" "}
            {audioOnlyClass} ({audioOnlyConfidence.toFixed(1)}%).
          </VerdictItem>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            The disagreement suggests the lyrics provide significant additional
            context that influences the classification.
          </p>
        </>
      )}
    </div>
  );
}

export default FinalVerdict;
