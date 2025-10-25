import { Music, Mic } from "lucide-react";

interface TopFactorsProps {
  multimodalTopFeature: any;
  audioOnlyTopFeature: any;
  multimodalIsHigher: boolean;
}

function TopFactors({
  multimodalTopFeature,
  audioOnlyTopFeature,
  multimodalIsHigher,
}: TopFactorsProps) {
  // Determine order based on confidence
  const firstFeature = multimodalIsHigher
    ? {
        label: "Multimodal",
        data: multimodalTopFeature,
        icon: Music,
        color: "cyan",
      }
    : {
        label: "Unimodal",
        data: audioOnlyTopFeature,
        icon: Mic,
        color: "orange",
      };

  const secondFeature = multimodalIsHigher
    ? {
        label: "Unimodal",
        data: audioOnlyTopFeature,
        icon: Mic,
        color: "orange",
      }
    : {
        label: "Multimodal",
        data: multimodalTopFeature,
        icon: Music,
        color: "cyan",
      };

  const FeatureItem = ({ feature }: { feature: typeof firstFeature }) => {
    const Icon = feature.icon;
    const bgColor =
      feature.color === "cyan" ? "bg-cyan-500/20" : "bg-orange-500/20";
    const iconColor =
      feature.color === "cyan" ? "text-cyan-400" : "text-orange-400";
    const textColor =
      feature.color === "cyan" ? "text-cyan-400" : "text-orange-400";

    return (
      <div className="flex items-center space-x-4">
        <div className={`${bgColor} p-3 rounded-lg flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <span className={`font-semibold ${textColor}`}>{feature.label}:</span>
          <span className="text-gray-900 dark:text-white ml-2">
            {feature.data?.feature_text || "No data"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-black-darker p-6 rounded-xl space-y-4">
      <h3 className="text-lg font-semibold font-montserrat text-gray-900 dark:text-white">
        Top Factors
      </h3>
      <FeatureItem feature={firstFeature} />
      <FeatureItem feature={secondFeature} />
    </div>
  );
}

export default TopFactors;
