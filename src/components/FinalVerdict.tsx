import CheckItem from "./CheckItem";

interface FinalVerdictProps {
  multimodalClass: string;
  audioOnlyClass: string;
  multimodalConfidence: number;
  audioOnlyConfidence: number;
  fileName: string;
}

function FinalVerdict({
  multimodalClass,
  audioOnlyClass,
  multimodalConfidence,
  audioOnlyConfidence,
  fileName,
}: FinalVerdictProps) {
  const sameClassification = multimodalClass === audioOnlyClass;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Final Verdict</h3>

      {sameClassification ? (
        <>
          <CheckItem type="success">
            The Multimodal model correctly identified the song "{fileName}" as{" "}
            {multimodalClass} with a {(multimodalConfidence * 100).toFixed(1)}%
            confidence score.
          </CheckItem>
          <CheckItem type="success">
            The Unimodal model also classified it as {audioOnlyClass} but with a{" "}
            {audioOnlyConfidence > multimodalConfidence ? "higher" : "lower"}{" "}
            {(audioOnlyConfidence * 100).toFixed(1)}% confidence.
          </CheckItem>
          <p className="text-xs text-gray-400 italic">
            Both models arrived at the correct classification; however, the
            multimodal model demonstrated{" "}
            {multimodalConfidence > audioOnlyConfidence ? "stronger" : "weaker"}{" "}
            confidence, and deeper contextual understanding.
          </p>
        </>
      ) : (
        <>
          <CheckItem type="warning">
            The models disagree: Multimodal classified as {multimodalClass} (
            {(multimodalConfidence * 100).toFixed(1)}%) while Unimodal
            classified as {audioOnlyClass} (
            {(audioOnlyConfidence * 100).toFixed(1)}%).
          </CheckItem>
          <p className="text-xs text-gray-400 italic">
            The disagreement suggests the lyrics provide significant additional
            context that influences the classification.
          </p>
        </>
      )}
    </div>
  );
}

export default FinalVerdict;
