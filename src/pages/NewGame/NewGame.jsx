import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TypingGameComponent from "../../components/TypingGameComponent";
import { numberOfTexts } from "../../utils/textPicker";
import { useGame } from "../../providers/GameProvider";

const NewGame = () => {
  const { text, level, selectedTexts, nextLevelClick } = useGame();
  return (
    <>
      <div>
        <TypingGameComponent typingText={text} />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => nextLevelClick(selectedTexts)}
          endIcon={<ArrowForward />}
          disabled={level === numberOfTexts - 1}
        >
          next
        </Button>
      </div>
    </>
  );
};

export default NewGame;
