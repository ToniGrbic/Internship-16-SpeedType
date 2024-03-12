import React, { useEffect, useRef } from "react";
import useTypingGame from "react-typing-game-hook";

const TypingGameComponent = () => {
  const textEl = useRef(null);
  const {
    states: { chars, charsState },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame("Click on me and start typing away!");

  useEffect(() => {
    textEl.current.focus();
  }, []);

  return (
    <h1
      ref={textEl}
      onKeyDown={(e) => {
        const key = e.key;
        if (key === "Escape") {
          resetTyping();
        } else if (key === "Backspace") {
          deleteTyping(false);
        } else if (key.length === 1) {
          insertTyping(key);
        }
        e.preventDefault();
      }}
      tabIndex={0}
    >
      {chars.split("").map((char, index) => {
        let state = charsState[index];
        let color = state === 0 ? "black" : state === 1 ? "green" : "red";
        return (
          <span key={char + index} style={{ color }}>
            {char}
          </span>
        );
      })}
    </h1>
  );
};

export default TypingGameComponent;
