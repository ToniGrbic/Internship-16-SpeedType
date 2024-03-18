import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import { useGame, GAME_TYPE } from "../../providers/GameProvider";
import { Box, Tab, Tabs } from "@mui/material";
import DialogSwitch from "../Dialogs/DialogSwitch";
import { practiceDialogText } from "../../utils/constants";
import styles from "./index.module.css";
import { useStopWatch } from "../../providers/StopWatchProvider";

const Header = () => {
  const navigate = useNavigate();
  const { resetClock } = useStopWatch();
  const { open, close } = useDialog();
  const {
    selectTexts,
    setGameType,
    resetGame,
    totalWordsPerMinute,
    levelsPassed,
  } = useGame();

  const [value, setValue] = useState(0);

  const handleSubmit = (route, gameType = null) => {
    close();
    resetClock();
    resetGame();
    setGameType(gameType);
    selectTexts();
    navigate(route);
  };

  const openNewGame = () => {
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
      onSubmit: () => handleSubmit("/"),
      text: practiceDialogText,
    });
  };

  const navigationOptions = [openPractice, openNewGame];

  const handleChange = (e, index) => {
    setValue(index);
    navigationOptions[index]();
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
          <Tab label="Practice" {...a11yProps(0)} />
          <Tab label="New Game" {...a11yProps(1)} />
        </Tabs>
        <div className={styles["header-stats-container"]}>
          <p className={styles["wpm-text"]}>Total WPM: {totalWordsPerMinute}</p>
          <p className={styles["wpm-text"]}>Levels Passed: {levelsPassed}</p>
        </div>
      </Box>

      <DialogSwitch />
      <Outlet />
    </>
  );
};

export default Header;
