import { ScanText } from "lucide-react";

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

  return (
    <div className="flex flex-col space-y-2 p-4 w-full max-w-3xl bg-black-dark-blue rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <h3>Lyrics that sounded most {classification}:</h3>
        <h3>Weight:</h3>
      </div>

      <div className="space-y-3">
        {features.length > 0 ? (
          features.slice(0, 10).map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 space-y-2.5"
            >
              <div className="flex-1 text-center text-xs text-gray-300">
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
              <div className="w-16 text-right text-sm font-mono text-gray-300">
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
