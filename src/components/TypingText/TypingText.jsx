import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useGame } from "../../providers/GameProvider";
import { PhaseType, CharStateType } from "react-typing-game-hook";
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
  const [isError, setIsError] = useState(false);
  const { level } = useGame();
  const { startClock } = useStopWatch();

  const hasIncorrectChars = (key) => {
    return (
      charsState.includes(CharStateType.Incorrect) ||
      key !== chars[currIndex + 1]
    );
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (phase === PhaseType.NotStarted) startClock();

    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      if (hasIncorrectChars(key) && currIndex + 2 === chars.length) {
        setIsError(true);
        return;
      }
      setIsError(false);
      insertTyping(key);
    }
    e.preventDefault();
  };

  useEffect(() => {
    textEl.current.focus();
  }, [level]);

  return (
    <>
      <p
        className={styles["incorrect-chars-message"]}
        style={{ color: isError ? "red" : "transparent" }}
      >
        Text must have all correct chars to finish the level!
      </p>
      <h2
        className={styles.typingText}
        ref={textEl}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {chars.split("").map((char, index) => {
          const state = charsState[index];
          const color = state === CharStateType.Correct ? "green" : "black";
          const backgroundColor =
            state === CharStateType.Incorrect ? "#ff8080" : "transparent";

          return (
            <span
              key={index + id}
              style={{ backgroundColor, color }}
              className={`${styles["letter-span"]} ${
                currIndex === index ? styles.currentLetter : ""
              }`}
            >
              {char}
            </span>
          );
        })}
      </h2>
    </>
  );
};

export default TypingText;
