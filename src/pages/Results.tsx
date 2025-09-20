import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import ResultsMain from "../components/ResultsMain";
import Title from "../components/Title";

function Results() {
  // Use the location api
  const location = useLocation();

  // To get the API results passed by the landing page
  const { result, lyrics, fileName } = location.state || {};

  return (
    <div>
      {/* Header component (made this a component in case we want to add more moving forward) */}
      <Header />

      {/* Main page body */}
      <main className="text-center pt-8 pb-24">
        {/* Title component (made this a component as well just in case we want to add more) */}
        <Title />

        {/* Main content container */}
        <ResultsMain result={result} lyrics={lyrics} fileName={fileName} />
      </main>
    </div>
  );
}

export default Results;
