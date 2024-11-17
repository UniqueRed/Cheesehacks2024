import React, { useState, useEffect } from "react";

const Flashcard = ({ question, answer, flipState }) => {
  const [showAnswer, setShowAnswer] = useState(flipState);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setShowAnswer((prevState) => !prevState);
    } else if (e.key === "ArrowDown") {
        setShowAnswer((prevState) => !prevState);
    } else if (e.key === "Space") {
        setShowAnswer((prevState) => !prevState);
    }
  };

  useEffect(() => {
    setShowAnswer(flipState);
  }, [flipState]);

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
