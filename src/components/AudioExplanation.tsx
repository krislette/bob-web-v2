import { Music } from "lucide-react";
import Tooltip from "./Tooltip";

interface AudioExplanationProps {
  features: Array<{
    rank: number;
    feature_text: string;
    weight: number;
  }>;
  classification: string;
}

function AudioExplanation({ features, classification }: AudioExplanationProps) {
  const maxWeight = Math.max(...features.map((f) => Math.abs(f.weight)), 0.001);

  const formatAudioFeature = (featureText: string): string => {
    // Parse format like "drums_T9" or "vocals_T1"
    const match = featureText.match(/^(.+)_T(\d+)$/);

    if (match) {
      const [, instrument, timeIndex] = match;

      // Convert time index to seconds (each segment is 12 seconds)
      const startSeconds = parseInt(timeIndex) * 12;
      const endSeconds = startSeconds + 12;

      // Format to MM:SS
      const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
      };

      // Capitalize instrument name
      const instrumentName =
        instrument.charAt(0).toUpperCase() + instrument.slice(1);

      return `${instrumentName} at ${formatTime(startSeconds)}-${formatTime(
        endSeconds
      )}`;
    }

    return featureText;
  };

  const tooltipContent = `**What are audio weights?**
Weights show how strongly each audio segment influenced the classification. Higher absolute values mean stronger influence.

**Timeframe notation**
"Vocals at 0:12-0:24" means the model detected patterns in vocals between 12 and 24 seconds. Each segment is 12 seconds long.

**Positive weights**
Values above 0 indicate characteristics commonly found in ${classification} music.

**Negative weights**
Values below 0 suggest characteristics more typical of ${
    classification === "AI-Generated" ? "Human-Composed" : "AI-Generated"
  } music.

**Instrument analysis**
The model examines different audio elements separately:

- Vocals: Singing style and pitch variations

- Drums: Rhythm patterns and timing

- Bass: Groove patterns and dynamics

- Other instruments: Harmony and production style

**Weight strength**

- 0.005+: Very strong indicator

- 0.001-0.005: Moderate indicator

- <0.001: Weak indicator

**How to interpret**
If you see "Drums at 1:24-1:36" with weight +0.0005, it means the drum pattern during that 12-second window showed characteristics typical of ${classification} songs, which contributed positively to the final prediction. If you see weight -0.0003, it means that segment has characteristics more typical of ${
    classification === "AI-Generated" ? "Human-Composed" : "AI-Generated"
  } songs, which worked against the ${classification} classification.`;

  return (
    <div className="flex flex-col space-y-2 p-4 w-full max-w-3xl bg-black-dark-blue rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <h3>Audio parts that sounded most {classification}:</h3>
        <div className="flex items-center">
          <h3>Weight:</h3>
          <Tooltip content={tooltipContent} />
        </div>
      </div>

      <div className="space-y-3">
        {features.length > 0 ? (
          features.slice(0, 10).map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 space-y-2.5"
            >
              <div className="flex-1 text-center text-xs text-gray-300">
                {formatAudioFeature(feature.feature_text)}
              </div>
              <div className="flex-[1.5] px-2">
                <div className="w-full rounded-md h-6">
                  <div
                    className="h-6 rounded-md bg-orange-400"
                    style={{
                      width: `${(Math.abs(feature.weight) / maxWeight) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-right text-sm font-mono text-gray-300">
                {feature.weight.toFixed(4)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-5 space-y-4">
            <Music className="w-10 h-10 text-gray-500" />
            <p className="text-gray-500 text-sm">
              No significant audio features found for this prediction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioExplanation;
