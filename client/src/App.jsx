import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Flashcard from "./components/Flashcard";
import Navbar from "./components/Navbar";

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startWithTerm, setStartWithTerm] = useState(false);

  const handleFileUploadComplete = (data) => {
    setFlashcards(data[0] || []);
    setCurrentIndex(0);
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

  const toggleStartWithTerm = () => {
    setStartWithTerm((prevState) => !prevState);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
    <Navbar></Navbar>

      <main>
        <FileUpload onUploadComplete={handleFileUploadComplete} />
        
        <div className="flashcards-container">
          {flashcards.length <= 0 ? (
            <p id="upload-message">Upload a file to get started.</p>
          ) : (
            <>
              <Flashcard
                key={currentIndex}
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
              />
              <p>{currentIndex + 1}/{flashcards.length}</p>
              
              <div className="navigation-buttons">
                <button id="cycleButtons" className="buttons" onClick={goToPreviousCard}>&larr; Previous</button>
                <button id="cycleButtons" className="buttons" onClick={goToNextCard}>Next &rarr;</button>
              </div>

              {/* <button onClick={toggleStartWithTerm}>
                Start with {startWithTerm ? 'Definition' : 'Term'}
              </button> */}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default App;