import React from "react";
import { PhaseType, CharStateType } from "react-typing-game-hook";
import { useGame } from "../../../providers/GameProvider";
import { Button } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { numberOfTexts } from "../../../utils/textPicker";

const NextButton = ({ phase, charsState }) => {
  const { level, selectedTexts, nextLevelClick } = useGame();

  return (
    <Button
      variant="contained"
      onClick={() => nextLevelClick(selectedTexts)}
      endIcon={<ArrowForward />}
      disabled={
        level === numberOfTexts - 1 ||
        phase !== PhaseType.Ended ||
        charsState.includes(CharStateType.Incorrect)
      }
    >
      next
    </Button>
  );
};

export default NextButton;
