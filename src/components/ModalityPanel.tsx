import ConfidenceBar from "./ConfidenceBar";
import ResultPill from "./ResultPill";
import AudioExplanation from "./AudioExplanation";
import LyricsExplanation from "./LyricsExplanation";
import { adjustConfidenceScore } from "../utils/confidenceAdjuster";

interface ModalityPanelProps {
  title: string;
  prediction: any;
  explanation: any;
  showLyrics?: boolean;
}

function ModalityPanel({
  title,
  prediction,
  explanation,
  showLyrics = true,
}: ModalityPanelProps) {
  const confidenceScore = adjustConfidenceScore(
    prediction?.confidence || 0,
    97
  );
  const classification = prediction?.label || "Unknown";

  // Filter features by modality
  const lyricsFeatures =
    explanation?.explanations?.filter((f: any) => f.modality === "lyrics") ||
    [];

  const audioFeatures =
    explanation?.explanations?.filter((f: any) => f.modality === "audio") || [];

  return (
    <div className="bg-gray-100 dark:bg-black-darker flex flex-col items-center p-4 sm:p-6 md:p-8 rounded-xl space-y-4 md:space-y-6">
      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold font-montserrat uppercase tracking-wider text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Result Pill */}
      <ResultPill classification={classification} />

      {/* Confidence Bar */}
      <div className="w-full space-y-2">
        <ConfidenceBar
          percentage={confidenceScore}
          label="Confidence"
          classification={classification}
        />
      </div>

      {/* Explanation Text */}
      <p className="text-sm text-justify text-gray-700 dark:text-white">
        This song was classified as <strong>{classification}</strong> because
        certain {showLyrics ? "lyrics and " : ""}audio segments closely matched
        patterns commonly found in
        {classification === "AI-Generated"
          ? " AI-generated songs."
          : " human-composed songs."}
      </p>

      {/* Lyrics Explanation (only for multimodal) */}
      {showLyrics && lyricsFeatures.length > 0 && (
        <LyricsExplanation
          features={lyricsFeatures}
          classification={classification}
        />
      )}

      {/* Audio Explanation */}
      {audioFeatures.length > 0 && (
        <AudioExplanation
          features={audioFeatures}
          classification={classification}
        />
      )}
    </div>
  );
}

export default ModalityPanel;
