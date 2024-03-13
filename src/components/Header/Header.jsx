import React from "react";
import { Outlet } from "react-router-dom";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import { Button } from "@mui/material";
import DialogSwitch from "../Dialogs/DialogSwitch";

const Header = () => {
  const { open } = useDialog();

  const handleNewGame = (e) => {
    open(DIALOG.NEW_GAME);
  };

  const handlePractice = (e) => {
    open(DIALOG.PRACTICE);
  };

  return (
    <>
      <div>
        <Button onClick={handleNewGame} color="inherit">
          New Game
        </Button>
        <Button onClick={handlePractice} color="inherit">
          Practice
        </Button>
      </div>
      <DialogSwitch />
      <Outlet />
    </>
  );
};

export default Header;
