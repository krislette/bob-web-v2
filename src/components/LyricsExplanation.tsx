import { ScanText } from "lucide-react";
import Tooltip from "./Tooltip";

interface LyricsExplanationProps {
  features: Array<{
    rank: number;
    feature_text: string;
    weight: number;
  }>;
  classification: string;
}

function LyricsExplanation({
  features,
  classification,
}: LyricsExplanationProps) {
  const maxWeight = Math.max(...features.map((f) => Math.abs(f.weight)), 0.001);

  const tooltipContent = `**What are lyric weights?**
Weights show how strongly each lyric influenced the classification. The AI analyzed specific words and phrases to find patterns typical of ${classification} music.

**Positive weights**
Values above 0 indicate this lyric has characteristics commonly found in ${classification} songs. Higher positive values mean stronger matching patterns.

**Negative weights**
Values below 0 suggest this lyric has characteristics more typical of ${
    classification === "AI-Generated" ? "Human-Composed" : "AI-Generated"
  } music, working against the current classification.

**Weight magnitude**

- 0.005+: Very strong indicator

- 0.001-0.005: Moderate indicator

- <0.001: Weak indicator

**How to interpret**
If you see a lyric with weight +0.0005, it means that phrase showed characteristics typical of ${classification} songs, which contributed positively to the final classification. If you see weight -0.0003, it means that phrase has characteristics more typical of ${
    classification === "AI-Generated" ? "Human-Composed" : "AI-Generated"
  } songs, which worked against the ${classification} classification.`;

  return (
    <div className="flex flex-col space-y-2 p-4 w-full max-w-3xl text-black-dark dark:text-white-custom bg-gray-200 dark:bg-black-dark-blue rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <h3>Lyrics that sounded most {classification}:</h3>
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
              <div className="flex-1 text-center text-xs text-black-dark dark:text-gray-300">
                "{feature.feature_text}"
              </div>
              <div className="flex-[1.5] px-2">
                <div className="w-full rounded-md h-6">
                  <div
                    className="h-6 rounded-md bg-teal-500"
                    style={{
                      width: `${(Math.abs(feature.weight) / maxWeight) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-right text-sm font-mono text-black-dark dark:text-gray-300">
                {feature.weight.toFixed(4)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-5 space-y-4">
            <ScanText className="w-10 h-10 text-gray-500" />
            <p className="text-gray-500 text-sm">
              No significant lyrical features found for this prediction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LyricsExplanation;
