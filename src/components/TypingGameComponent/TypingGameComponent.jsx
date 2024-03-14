import React, { useEffect, useRef } from "react";
import useTypingGame from "react-typing-game-hook";
import styles from "./index.module.css";

const TypingGameComponent = ({ typingText }) => {
  const textEl = useRef(null);
  const { id, text } = typingText;
  const {
    states: { chars, charsState, currIndex },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(text);

  useEffect(() => {
    textEl.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
    e.preventDefault();
  };

  return (
    <h1
      className={styles.typingText}
      ref={textEl}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {chars.split("").map((char, index) => {
        let state = charsState[index];
        let color = state === 0 ? "black" : state === 1 ? "green" : "red";
        return (
          <span
            key={index + char}
            style={{ color, marginLeft: "1px" }}
            className={currIndex === index ? styles.currentLetter : ""}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
};

export default TypingGameComponent;
