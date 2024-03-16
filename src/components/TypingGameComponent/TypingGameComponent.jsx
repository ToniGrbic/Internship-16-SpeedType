import React, { useEffect, useRef } from "react";
import useTypingGame, {
  PhaseType,
  CharStateType,
} from "react-typing-game-hook";
import styles from "./index.module.css";
import NextButton from "../Buttons/NextButton/NextButton";
import ReplayIcon from "@mui/icons-material/Replay";
import { useGame, GAME_TYPE } from "../../providers/GameProvider";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import { newLevelDialogText } from "../../utils/constants";
import { numberOfTexts } from "../../utils/textPicker";
import { Button } from "@mui/material";

const TypingGameComponent = () => {
  const textEl = useRef(null);
  const {
    level,
    gameType,
    text: typingText,
    nextLevelClick,
    selectTexts,
    resetGame,
    setGameType,
  } = useGame();

  const { id, text } = typingText;
  const { open, close } = useDialog();

  const {
    states: { chars, charsState, currIndex, phase },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(text, { skipCurrentWordOnSpace: false });

  const onSubmit = (gameType) => {
    close();
    setGameType(gameType);
    resetGame();
    selectTexts();
  };

  const openResultsDialog = () => {
    open(DIALOG.RESULTS, {
      onSubmit: () => {
        openNewGameDialog();
      },
    });
  };

  const openNewGameDialog = () => {
    open(DIALOG.NEW_GAME, {
      onSubmitRegular: () => onSubmit(GAME_TYPE.REGULAR),
      onSubmitInstantDeath: () => onSubmit(GAME_TYPE.INSTANT_DEATH),
    });
  };

  const openConfirmationDialog = () => {
    open(DIALOG.CONFIRMATION, {
      onSubmit: () => {
        nextLevelClick();
        close();
      },
      text: newLevelDialogText,
    });
  };

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

  useEffect(() => {
    textEl.current.focus();
  }, [level]);

  useEffect(() => {
    if (gameType !== GAME_TYPE.INSTANT_DEATH) return;
    if (!charsState.includes(CharStateType.Incorrect)) return;
    openResultsDialog();
  }, [charsState]);

  useEffect(() => {
    if (phase !== PhaseType.Ended) return;
    if (level !== numberOfTexts - 1) {
      openConfirmationDialog();
    } else openResultsDialog();
  }, [phase]);

  return (
    <>
      <h1>Game mode: {gameType}</h1>
      <h1>Level: {level + 1}</h1>
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
      <Button>
        <ReplayIcon onClick={resetTyping} />
      </Button>
      <NextButton phase={phase} />
    </>
  );
};

export default TypingGameComponent;
