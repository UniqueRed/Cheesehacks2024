import React, { useState, useRef } from "react";
import FileUpload from "./components/FileUpload";
import Flashcard from "./components/Flashcard";
import Navbar from "./components/Navbar";

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flashcardsContainerRef = useRef(null);

  const handleFileUploadComplete = (data) => {
    setFlashcards(data[0] || []);
    setCurrentIndex(0);

    if (flashcardsContainerRef.current) {
      flashcardsContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      goToNextCard();
    } else if (e.key === "ArrowLeft") {
      goToPreviousCard();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flashcards]);

  return (
    <>
      <Navbar />
      <main>
        <FileUpload onUploadComplete={handleFileUploadComplete} />
        <div ref={flashcardsContainerRef} className="flashcards-container">
          {flashcards.length <= 0 ? (
            <p id="upload-message">Upload a file to get started.</p>
          ) : (
            <>
              <Flashcard
                key={currentIndex}
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
              />
              <p style={{ textAlign: "center" }}>
                {currentIndex + 1}/{flashcards.length}
              </p>
              <div className="navigation-buttons">
                <button id="cycleButtons" className="buttons" onClick={goToPreviousCard}>
                  &larr;
                </button>
                <button id="cycleButtons" className="buttons" onClick={goToNextCard}>
                  &rarr;
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default App;