import React, { useEffect, useRef } from "react";
import useTypingGame, { PhaseType } from "react-typing-game-hook";
import styles from "./index.module.css";
import { useGame } from "../../providers/GameProvider";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import { newLevelDialogText } from "../../utils/constants";
import { numberOfTexts } from "../../utils/textPicker";

const TypingGameComponent = () => {
  const textEl = useRef(null);
  const { text: typingText, level, nextLevelClick } = useGame();
  const { id, text } = typingText;
  const { open, close } = useDialog();

  const {
    states: { chars, charsState, currIndex, phase },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(text);

  useEffect(() => {
    textEl.current.focus();
  }, []);

  useEffect(() => {
    if (phase === PhaseType.Ended && level !== numberOfTexts - 1) {
      open(DIALOG.CONFIRMATION, {
        onSubmit: () => {
          nextLevelClick();
          close();
        },
        text: newLevelDialogText,
      });
    }
  }, [phase]);

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
