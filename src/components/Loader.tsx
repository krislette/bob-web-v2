import { useState, useEffect } from "react";

const loadingStatuses: string[] = [
  "Request received...",
  "Loading your audio file...",
  "Preparing audio for analysis...",
  "Processing lyrics...",
  "Extracting patterns from audio...",
  "Extracting patterns from lyrics...",
  "Combining audio and lyrics data...",
  "Preparing classification model...",
  "Analyzing your song...",
  "Determining if it's 'Bach' or 'Bot'...",
  "Calculating model accuracy...",
  "Generating detailed explanation...",
  "Building visual insights...",
  "Finalizing results...",
  "Complete!",
];

interface LoaderProps {
  isCompleted?: boolean;
}

function Loader({ isCompleted = false }: LoaderProps) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  // When API completes, jump to final status
  useEffect(() => {
    if (isCompleted) {
      setCurrentStatusIndex(loadingStatuses.length - 1);
    }
  }, [isCompleted]);

  useEffect(() => {
    // Don't auto-progress if already completed
    if (isCompleted) return;

    // Define intervals for each status (in milliseconds)
    const intervals = [
      0, // Show immediately
      400, // 0.4 seconds
      800, // 0.8 seconds
      1200, // 1.2 seconds
      1600, // 1.6 seconds
      2200, // 2.2 seconds
      2800, // 2.8 seconds
      3500, // 3.5 seconds
      4200, // 4.2 seconds
      5000, // 5 seconds
      5800, // 5.8 seconds
      6600, // 6.6 seconds
      7400, // 7.4 seconds
      // Never auto-show the last status (Complete!)
    ];

    if (currentStatusIndex < intervals.length) {
      const timer = setTimeout(() => {
        setCurrentStatusIndex((prev) =>
          Math.min(prev + 1, loadingStatuses.length - 2)
        );
      }, intervals[currentStatusIndex]);

      return () => clearTimeout(timer);
    }
  }, [currentStatusIndex, isCompleted]);

  const currentStatus = loadingStatuses[currentStatusIndex];

  // Progress percentage based on status index
  // When completed, show 100%
  const progressPercentage = isCompleted
    ? 100
    : Math.min((currentStatusIndex / (loadingStatuses.length - 1)) * 95, 95);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-darkest px-4">
      <div className="max-w-md w-full space-y-15">
        {/* Cassette Tape Loader */}
        <div className="loader-wrapper">
          <div className="loader-hand loader-hand-left"></div>
          <div className="loader"></div>
          <div className="loader-hand loader-hand-right"></div>
        </div>

        {/* Status Message */}
        <div className="text-center space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-black-dark rounded-full h-2 overflow-hidden">
            <div
              className="bg-white-custom h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <p className="text-white-custom text-lg font-montserrat">
            {currentStatus}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
