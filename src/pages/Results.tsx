import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import ResultsMain from "../components/ResultsMain";
import Title from "../components/Title";

function Results() {
  // Use the location api
  const location = useLocation();

  // To get the API results passed by the landing page
  const { prediction, explanation, fileName } = location.state || {};

  return (
    <div>
      {/* Header component (made this a component in case we want to add more moving forward) */}
      <Header />

      {/* Main page body */}
      <main className="text-center px-4 md:px-8 lg:pt-8 pb-8 lg:pb-24">
        {/* Title component (made this a component as well just in case we want to add more) */}
        <Title />

        {/* Main content container */}
        <ResultsMain
          prediction={prediction}
          explanation={explanation}
          fileName={fileName}
        />
      </main>
    </div>
  );
}

export default Results;
