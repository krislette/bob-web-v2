import { useState } from "react";
import Header from "../components/Header";
import LandingMain from "../components/LandingMain";
import Title from "../components/Title";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttonText: "OK",
  });

  // Show modal function
  const showModal = (
    title: string,
    message: string,
    buttonText: string = "OK"
  ) => {
    setModalState({
      isOpen: true,
      title,
      message,
      buttonText,
    });
  };

  // Close modal function
  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // If loading, show only the loader
  if (isLoading) {
    return (
      <>
        <Loader />
        {/* Modal still rendered even during loading */}
        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.title}
          message={modalState.message}
          buttonText={modalState.buttonText}
        />
      </>
    );
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
        <LandingMain onLoadingChange={setIsLoading} onShowModal={showModal} />
      </main>

      {/* Modal always rendered at this level */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        buttonText={modalState.buttonText}
      />
    </>
  );
}

export default Landing;
