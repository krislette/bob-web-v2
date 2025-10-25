import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ModalityPanel from "./ModalityPanel";
import ComparisonSummary from "./ComparisonSummary";

// Props for the main result body component
interface ResultsMainProps {
  multimodal?: {
    prediction: any;
    explanation: any;
  };
  audioOnly?: {
    prediction: any;
    explanation: any;
  };
  fileName?: string;
}

function ResultsMain({ multimodal, audioOnly, fileName }: ResultsMainProps) {
  const navigate = useNavigate();

  const handleAnalyze = () => {
    // Just navigate back to landing page
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-6">
      {/* File name display */}
      {fileName && (
        <p className="text-sm text-gray-400">
          Analysis results for: <span className="text-white">{fileName}</span>
        </p>
      )}

      {/* Dual Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multimodal Panel */}
        {multimodal && (
          <ModalityPanel
            title="MULTIMODAL"
            prediction={multimodal.prediction}
            explanation={multimodal.explanation}
            showLyrics={true}
          />
        )}

        {/* Unimodal Panel */}
        {audioOnly && (
          <ModalityPanel
            title="UNIMODAL"
            prediction={audioOnly.prediction}
            explanation={audioOnly.explanation}
            showLyrics={false}
          />
        )}
      </div>

      {/* Comparison Summary Section */}
      {multimodal && audioOnly && (
        <ComparisonSummary
          multimodal={multimodal}
          audioOnly={audioOnly}
          fileName={fileName || "Unknown"}
        />
      )}

      {/* Analyze Another Music Button */}
      <div className="flex flex-col space-y-2 w-full max-w-3xl mx-auto">
        <Button onClick={handleAnalyze} disabled={false} />
      </div>
    </div>
  );
}

export default ResultsMain;
