import Header from "../components/Header";
import ResultsMain from "../components/ResultsMain";
import Title from "../components/Title";

function Results() {
  return (
    <div>
      {/* Header component (made this a component in case we want to add more moving forward) */}
      <Header />

      {/* Main page body */}
      <main className="text-center">
        {/* Title component (made this a component as well just in case we want to add more) */}
        <Title />

        {/* Main content container */}
        <ResultsMain />
      </main>
    </div>
  );
}

export default Results;
