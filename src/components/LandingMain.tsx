import { useState } from "react";
import FileUpload from "./FileUpload";
import LyricsUpload from "./LyricsUpload";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { bachOrBotApi } from "../api/backendService";

// Props for landing main component
interface LandingMainProps {
  onLoadingChange: (isLoading: boolean) => void;
  onComplete: () => void;
  onShowModal: (title: string, message: string, buttonText?: string) => void;
}

function LandingMain({
  onLoadingChange,
  onComplete,
  onShowModal,
}: LandingMainProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState("");
  const navigate = useNavigate();

  // For the file
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    console.log(`Selected file ${file}`);
  };

  // For lyrics
  const handleLyricsChange = (lyricsText: string) => {
    setLyrics(lyricsText);
  };

  // For when the user actually clicks analyze button
  const handleAnalyze = async () => {
    if (!selectedFile || !lyrics.trim()) {
      onShowModal(
        "Incomplete Input",
        "We couldn't analyze your music right now. Please upload an audio file and enter lyrics."
      );
      return;
    }

    onLoadingChange(true);

    try {
      // Get responses for MLP and MusicLIME from model API
      const [predictionResponse, explanationResponse] = await Promise.all([
        bachOrBotApi.predict(selectedFile, lyrics),
        bachOrBotApi.explain(selectedFile, lyrics),
      ]);

      // Signal completion
      onComplete();

      // Wait to show "Complete!" message
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Then navigate to the /results page with the data
      navigate("/results", {
        state: {
          prediction: predictionResponse.results,
          explanation: explanationResponse.results,
          lyrics,
          fileName: selectedFile.name,
        },
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error analyzing", error);
      onLoadingChange(false);
      onShowModal(
        "Analysis Failed",
        "We couldn't analyze your music right now. Please check your connection and try again.",
        "Try Again"
      );
    }
  };

  // Check if both file and lyrics are provided
  const isFormValid = selectedFile !== null && lyrics.trim().length > 0;

  return (
    <div className="bg-black-darker flex flex-col items-center p-4 sm:p-6 md:p-8 pb-6 md:pb-10 rounded-xl mt-4 sm:mt-6 md:mt-8 mx-auto max-w-3xl space-y-6 md:space-y-8">
      {/* Container for the audio upload portion */}
      <div className="flex flex-col space-y-2 w-full max-w-3xl">
        {/* Title */}
        <h3 className="flex flex-start font-montserrat">Audio File</h3>

        {/* File upload component */}
        <FileUpload
          onFileSelect={handleFileSelect}
          onShowModal={onShowModal}
          acceptedTypes="audio/*, .mp3, .wav"
          maxSize={10}
        />
      </div>

      {/* Container for the lyrics input portion */}
      <div className="flex flex-col space-y-2 w-full max-w-3xl">
        {/* Title */}
        <h3 className="flex flex-start font-montserrat">Lyrics</h3>

        {/* File upload component */}
        <LyricsUpload onLyricsChange={handleLyricsChange} />
      </div>

      {/* Button */}
      <div className="flex flex-col space-y-2 w-full max-w-3xl">
        <Button onClick={handleAnalyze} disabled={!isFormValid} />
      </div>
    </div>
  );
}

export default LandingMain;
