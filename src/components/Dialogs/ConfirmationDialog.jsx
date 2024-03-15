import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const ConfirmationDialog = ({ isOpen, onClose, onSubmit, text }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{text}</DialogTitle>
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

export default ConfirmationDialog;
