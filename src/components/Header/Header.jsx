import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import { useGame, GAME_TYPE } from "../../providers/GameProvider";
import { Box, Tab, Tabs } from "@mui/material";
import DialogSwitch from "../Dialogs/DialogSwitch";
import { practiceDialogText } from "../../utils/constants";
import styles from "./index.module.css";

const Header = () => {
  const navigate = useNavigate();
  const { open, close } = useDialog();
  const { selectTexts, setGameType, totalWordsPerMinute } = useGame();
  const [value, setValue] = useState(0);

  const handleSubmit = (route, gameType) => {
    close();
    setGameType(gameType);
    navigate(route);
  };

  const openNewGame = () => {
    selectTexts();
    open(DIALOG.NEW_GAME, {
      onSubmitRegular: () => {
        handleSubmit("/new-game", GAME_TYPE.REGULAR);
      },
      onSubmitInstantDeath: () => {
        handleSubmit("/new-game", GAME_TYPE.INSTANT_DEATH);
      },
    });
  };

  const openPractice = () => {
    open(DIALOG.CONFIRMATION, {
      onSubmit: () => handleSubmit("/practice"),
      text: practiceDialogText,
    });
  };

  const options = [() => navigate("/"), openPractice, openNewGame];

  const handleChange = (event, index) => {
    setValue(index);
    options[index]();
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Practice" {...a11yProps(1)} />
          <Tab label="New Game" {...a11yProps(2)} />
        </Tabs>
        <p className={styles["wpm-text"]}>Total WPM: {totalWordsPerMinute}</p>
      </Box>

      <DialogSwitch />
      <Outlet />
    </>
  );
};

export default Header;
