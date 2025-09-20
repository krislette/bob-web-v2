import { useLocation } from "react-router-dom";

function Title() {
  const location = useLocation();

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="font-montserrat font-[600] text-4xl">Music Classifier</h1>

      {/* Subcaption conditional rendering based on current route */}
      <p>
        {location.pathname === "/"
          ? "Upload your songs and lyrics to discover whether they were created by AI or human artists."
          : "Here are the results of the analysis performed by our Bach or Bot tool."}
      </p>
    </div>
  );
}

export default Title;
