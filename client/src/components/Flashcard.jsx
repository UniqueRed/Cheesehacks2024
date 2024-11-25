import React, { useState, useEffect } from "react";

const Flashcard = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setShowAnswer((prevState) => !prevState);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
        setShowAnswer((prevState) => !prevState);
    } else if (e.key === " ") {
      e.preventDefault();
        setShowAnswer((prevState) => !prevState);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <p className="content">{!showAnswer ? question : answer}</p>
    </div>
  );
};

export default Flashcard;
