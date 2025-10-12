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
      20000, // 20 seconds
      50000, // 50 seconds
      80000, // 1 min 20 sec
      120000, // 2 minutes
      170000, // 2 min 50 sec
      230000, // 3 min 50 sec
      300000, // 5 minutes
      380000, // 6 min 20 sec
      470000, // 7 min 50 sec
      520000, // 8 min 40 sec
      570000, // 9 min 30 sec
      600000, // 10 minutes
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
