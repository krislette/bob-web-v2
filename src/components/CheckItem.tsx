interface CheckItemProps {
  type: "success" | "warning";
  children: React.ReactNode;
}

function CheckItem({ type, children }: CheckItemProps) {
  const icon = type === "success" ? "✓" : "⚠";
  const color = type === "success" ? "text-green-400" : "text-yellow-400";

  return (
    <div className="flex items-start space-x-2">
      <span className={`${color} text-xl`}>{icon}</span>
      <p className="text-sm">{children}</p>
    </div>
  );
}

export default CheckItem;
