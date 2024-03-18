import React, { useContext, useEffect, useState } from "react";
import { randomlySelectTexts } from "../utils/textPicker";

const defaultContext = {
  selectedTexts: [],
  text: "",
  level: 0,
  levelsPassed: 0,
  totalWordsPerMinute: 0,
  gameWordsPerMinute: 0,
  gameType: "",
  isGameFinished: false,
  nextLevelClick: () => {},
  setLevelsPassed: () => {},
  calculateGameWordsPerMinute: () => {},
  selectTexts: () => {},
  resetGame: () => {},
  setGameType: () => {},
  setIsGameFinished: () => {},
};

export const GAME_TYPE = {
  REGULAR: "Regular",
  INSTANT_DEATH: "Instant Death",
};

const GameContext = React.createContext(defaultContext);

const GameProvider = ({ children }) => {
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [text, setText] = useState("");
  const [level, setLevel] = useState(0);
  const [levelsPassed, setLevelsPassed] = useState(0);
  const [totalWordsPerMinute, setTotalWordsPerMinute] = useState(0);
  const [gameWordsPerMinute, setGameWordsPerMinute] = useState(0);
  const [gameType, setGameType] = useState(GAME_TYPE.REGULAR);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const selectTexts = () => {
    const selectedTexts = randomlySelectTexts();
    setSelectedTexts(selectedTexts);
    setText(selectedTexts[0]);
  };

  const resetGame = () => {
    setLevel(0);
    setGameWordsPerMinute(0);
  };

  const nextLevelClick = () => {
    setLevel((prev) => prev + 1);
    setLevelsPassed((prev) => prev + 1);
    setText(selectedTexts[level + 1]);
  };

  const calculateGameWordsPerMinute = (time) => {
    const currentText = text.text;
    const numberOfWords = currentText.split(" ").length;
    const minutes = time / 60000;
    const wordsPerMinute = numberOfWords / minutes;
    setGameWordsPerMinute((prev) => Math.round((prev + wordsPerMinute) / 2));
  };

  useEffect(() => {
    if (!isGameFinished) return;

    setTotalWordsPerMinute((prev) => {
      if (prev === 0) return gameWordsPerMinute;
      return Math.round((prev + gameWordsPerMinute) / 2);
    });
  }, [isGameFinished]);

  return (
    <GameContext.Provider
      value={{
        selectedTexts,
        text,
        level,
        levelsPassed,
        totalWordsPerMinute,
        gameWordsPerMinute,
        gameType,
        isGameFinished,
        nextLevelClick,
        setLevelsPassed,
        calculateGameWordsPerMinute,
        selectTexts,
        resetGame,
        setGameType,
        setIsGameFinished,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export const useGame = () => useContext(GameContext);

export default GameProvider;
