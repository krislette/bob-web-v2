import { useState } from "react";
import Header from "../components/Header";
import LandingMain from "../components/LandingMain";
import Title from "../components/Title";
import Loader from "../components/Loader";

function Landing() {
  const [isLoading, setIsLoading] = useState(false);

  // If loading, show only the loader and hide the landing
  if (isLoading) {
    return <Loader />;
  }

  // Otherwise, just show the landing page by default
  return (
    <>
      {/* Header component (made this a component in case we want to add more moving forward) */}
      <Header />

      {/* Main page body */}
      <main className="text-center pt-8 pb-24">
        {/* Title component (made this a component as well just in case we want to add more) */}
        <Title />

        {/* Main content container */}
        <LandingMain onLoadingChange={setIsLoading} />
      </main>
    </>
  );
}

export default Landing;
