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

const NewGameDialog = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Dialog open={isOpen}>
      <IconButton
        sx={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>New Game</DialogTitle>
      <DialogContent>Select game mode</DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color="secondary">
          Regular
        </Button>
        <Button onClick={onSubmit} color="primary">
          Instant death
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
