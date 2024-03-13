import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const PracticeDialog = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Do you want to enter Practice mode?</DialogTitle>
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

export default PracticeDialog;
