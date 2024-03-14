import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TypingGameComponent from "../../components/TypingGameComponent";
import { numberOfTexts, randomlySelectTexts } from "../../utils/textPicker";

const NewGame = () => {
  const selectedTexts = randomlySelectTexts();
  const [text, setText] = useState(selectedTexts[0]);
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev) => prev + 1);
    setText(selectedTexts[counter + 1]);
  };
  return (
    <>
      <div>
        <TypingGameComponent typingText={text} />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          endIcon={<ArrowForward />}
          disabled={counter === numberOfTexts - 1}
        >
          next
        </Button>
      </div>
    </>
  );
};

export default NewGame;
