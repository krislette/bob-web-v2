import { Music, Mic } from "lucide-react";

interface TopFactorsProps {
  multimodalTopFeature: any;
  audioOnlyTopFeature: any;
}

function TopFactors({
  multimodalTopFeature,
  audioOnlyTopFeature,
}: TopFactorsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Top Factors</h3>

      {/* Multimodal top factor */}
      <div className="flex items-start space-x-3 bg-black-lighter p-3 rounded-lg">
        <Music className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-cyan-400">Multimodal:</p>
          <p className="text-xs text-gray-300">
            {multimodalTopFeature?.feature_text || "No data"}
          </p>
        </div>
      </div>

      {/* Unimodal top factor */}
      <div className="flex items-start space-x-3 bg-black-lighter p-3 rounded-lg">
        <Mic className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-orange-400">Unimodal:</p>
          <p className="text-xs text-gray-300">
            {audioOnlyTopFeature?.feature_text || "No data"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopFactors;
