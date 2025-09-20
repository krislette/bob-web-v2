import { useState } from "react";
import FileUpload from "./FileUpload";
import LyricsUpload from "./LyricsUpload";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

// Props for landing main component
interface LandingMainProps {
  onLoadingChange: (isLoading: boolean) => void;
  onShowModal: (title: string, message: string, buttonText?: string) => void;
}

function LandingMain({ onLoadingChange, onShowModal }: LandingMainProps) {
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
      // Consolidate all user inputs into one form data
      const formData = new FormData();
      formData.append("audio", selectedFile);
      formData.append("lyrics", lyrics);

      // TODO: Implement API on backend, this is placeholder for now
      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      // Get result
      const result = await response.json();

      // Then navigate to the /results page with the data
      navigate("/results", {
        state: { result, lyrics, fileName: selectedFile.name },
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
    <div className="bg-black-darker min-h-[calc(100vh-4rem)] flex flex-col items-center p-8 pb-10 rounded-xl mt-8 mx-64 space-y-8">
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
