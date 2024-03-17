import React, { useEffect } from "react";
import useTypingGame, { PhaseType } from "react-typing-game-hook";
import ReplayIcon from "@mui/icons-material/Replay";
import NextButton from "../Buttons/NextButton/NextButton";
import Stopwatch from "../Stopwatch";
import TypingText from "../TypingText";
import { useGame, GAME_TYPE } from "../../providers/GameProvider";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import { useStopWatch } from "../../providers/StopWatchProvider";
import { newLevelDialogText } from "../../utils/constants";
import { numberOfTexts } from "../../utils/textPicker";
import { Button, Box } from "@mui/material";

const TypingGameComponent = () => {
  const {
    level,
    gameType,
    text: typingText,
    nextLevelClick,
    selectTexts,
    resetGame,
    setGameType,
    calculateGameWordsPerMinute,
    setIsGameFinished,
  } = useGame();

  const { id, text } = typingText;
  const { open, close } = useDialog();
  const { stop, reset } = useStopWatch();

  const {
    states: { chars, errorChar, charsState, currIndex, phase },
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(text, { skipCurrentWordOnSpace: false });

  const typingTextProps = {
    chars,
    charsState,
    currIndex,
    phase,
    id,
    insertTyping,
    deleteTyping,
    resetTyping,
  };

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
    setIsGameFinished(false);
    reset();
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

  useEffect(() => {
    // handles instant death game mode
    if (gameType !== GAME_TYPE.INSTANT_DEATH || errorChar === 0) return;
    stop();
    openResultsDialog();
  }, [charsState]);

  useEffect(() => {
    if (phase !== PhaseType.Ended) return;
    stop();
    if (level !== numberOfTexts - 1) {
      openConfirmationDialog();
      return;
    }
    openResultsDialog();
    setIsGameFinished(true);
    calculateGameWordsPerMinute(getDuration());
  }, [phase]);

  return (
    <Box sx={{ padding: "0 1rem" }}>
      <h1>Game mode: {gameType}</h1>
      <h1>Level: {level + 1}</h1>
      <Stopwatch />
      <TypingText {...typingTextProps} />
      <Button>
        <ReplayIcon onClick={resetTyping} />
      </Button>
      <NextButton phase={phase} errorChar={errorChar} />
    </Box>
  );
};

export default TypingGameComponent;
