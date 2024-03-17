import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useGame } from "../../providers/GameProvider";

const ResultsDialog = ({ isOpen, onClose, onSubmit }) => {
  const { gameWordsPerMinute, totalWordsPerMinute } = useGame();
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Results</DialogTitle>
      <DialogContent>
        WPM: {gameWordsPerMinute}
        <br />
        Total WPM: {totalWordsPerMinute}
      </DialogContent>
      <DialogContent>Do you want to play again?</DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color="primary">
          YES
        </Button>
        <Button onClick={onClose} color="secondary">
          NO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultsDialog;
