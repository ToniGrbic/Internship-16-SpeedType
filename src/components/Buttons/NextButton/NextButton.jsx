import React from "react";
import { PhaseType } from "react-typing-game-hook";
import { useGame } from "../../../providers/GameProvider";
import { Button } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { numberOfTexts } from "../../../utils/textPicker";

const NextButton = ({ phase }) => {
  const { level, selectedTexts, nextLevelClick } = useGame();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => nextLevelClick(selectedTexts)}
      endIcon={<ArrowForward />}
      disabled={level === numberOfTexts - 1 || phase !== PhaseType.Ended}
    >
      next
    </Button>
  );
};

export default NextButton;
