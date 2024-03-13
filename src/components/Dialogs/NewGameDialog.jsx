import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const NewGameDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen}>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>New Game</DialogTitle>
      <DialogContent>Select game mode</DialogContent>
      <DialogActions>
        <Button color="secondary">Regular</Button>
        <Button color="primary">Instant death</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
