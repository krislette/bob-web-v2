import Button from "./Button";
import ConfidenceBar from "./ConfidenceBar";
import ResultPill from "./ResultPill";
import { useNavigate } from "react-router-dom";

// Props for the main result body component
interface ResultsMainProps {
  // TODO: Change type of result once API is created
  result?: any;
  lyrics?: string;
  fileName?: string;
}

function ResultsMain({ result, lyrics, fileName }: ResultsMainProps) {
  const navigate = useNavigate();

  // TODO: Remove this placeholder data once API is available
  const confidenceScore = result?.confidence || 93;
  const classification = result?.classication || "AI-Generated";

  // TODO: Use lyrics and file name if ever (like show them or whu if UI changes are permitted)
  console.log(lyrics);
  console.log(fileName);

  const handleAnalyze = () => {
    // Just navigate back to landing page
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black-darker min-h-[calc(100vh-4rem)] flex flex-col items-center p-8 pb-10 rounded-xl mt-8 mx-64 space-y-8">
      {/* Main result indicator pill */}
      <ResultPill classification={classification} />

      {/* Confidence container */}
      <div className="w-full max-w-3xl space-y-3">
        <ConfidenceBar
          percentage={confidenceScore}
          label="Confidence"
          classification={classification}
        />
      </div>

      {/* Result caption */}
      <p className="text-justify max-w-3xl">
        This song was classified as <strong>{classification}</strong> because
        certain lyrics and audio segments closely matched patterns commonly
        found in
        {classification === "AI-Generated"
          ? " AI-generated songs."
          : " human-composed songs."}{" "}
        The top contributing factors are shown below:
      </p>

      {/* XAI Results */}
      {/* TODO: Implement this in the future cause literally I can't imagine right now since there's no API */}
      {/* Container for the lyrics XAI results portion */}
      <div className="flex flex-col space-y-2 p-4 w-full max-w-3xl bg-black-dark-blue min-h-96 rounded-lg">
        <div className="flex justify-between w-full mb-4">
          <h3>Lyrics that sounded most like AI:</h3>
          <h3>Weight:</h3>
        </div>
        {/* Will probably insert component/code here for rendering XAI results */}
      </div>

      {/* XAI Results - Audio */}
      <div className="flex flex-col space-y-2 p-4 w-full max-w-3xl bg-black-dark-blue min-h-96 rounded-lg">
        <div className="flex justify-between w-full mb-4">
          <h3>Parts of the song that sounded most like AI:</h3>
          <h3>Weight:</h3>
        </div>

        {/* Will probably insert component/code here for rendering XAI results */}
      </div>

      {/* Button */}
      <div className="flex flex-col space-y-2 w-full max-w-3xl">
        <Button onClick={handleAnalyze} disabled={false} />
      </div>
    </div>
  );
}

export default ResultsMain;
