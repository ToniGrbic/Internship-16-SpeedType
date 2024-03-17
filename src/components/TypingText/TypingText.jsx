import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { useGame } from "../../providers/GameProvider";
import { PhaseType } from "react-typing-game-hook";
import { useStopWatch } from "../../providers/StopWatchProvider";

const TypingText = ({
  chars,
  charsState,
  currIndex,
  phase,
  id,
  insertTyping,
  deleteTyping,
  resetTyping,
}) => {
  const textEl = useRef(null);
  const { level } = useGame();
  const { start } = useStopWatch();

  const handleKeyDown = (e) => {
    const key = e.key;
    if (phase === PhaseType.NotStarted) start();
    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
    e.preventDefault();
  };
  useEffect(() => {
    textEl.current.focus();
  }, [level]);

  return (
    <h2
      className={styles.typingText}
      ref={textEl}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {chars.split("").map((char, index) => {
        const state = charsState[index];
        const color = state === 0 ? "black" : state === 1 ? "green" : "red";
        return (
          <span
            key={index + id}
            style={{ color, marginLeft: "1px" }}
            className={currIndex === index ? styles.currentLetter : ""}
          >
            {char}
          </span>
        );
      })}
    </h2>
  );
};

export default TypingText;