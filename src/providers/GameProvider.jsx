import React, { useContext, useEffect, useState } from "react";
import { randomlySelectTexts } from "../utils/textPicker";

const defaultContext = {
  selectedTexts: [],
  text: "",
  level: 0,
  totalWordsPerMinute: 0,
  gameWordsPerMinute: 0,
  nextLevelClick: () => {},
  calculateGameWordsPerMinute: () => {},
  selectTexts: () => {},
};

const GameContext = React.createContext(defaultContext);

const GameProvider = ({ children }) => {
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [text, setText] = useState("");
  const [level, setLevel] = useState(0);
  const [totalWordsPerMinute, setTotalWordsPerMinute] = useState(0);
  const [gameWordsPerMinute, setGameWordsPerMinute] = useState(0);

  const selectTexts = () => {
    const selectedTexts = randomlySelectTexts();
    setSelectedTexts(selectedTexts);
    setText(selectedTexts[0]);
  };

  const nextLevelClick = (selectedTexts) => {
    setLevel((prev) => prev + 1);
    setText(selectedTexts[level + 1]);
  };

  const calculateGameWordsPerMinute = (time, text) => {
    const words = text.split(" ").length;
    const minutes = time / 60;
    const wordsPerMinute = words / minutes;
    setGameWordsPerMinute(wordsPerMinute);
  };

  useEffect(() => {
    setTotalWordsPerMinute((prev) => prev + gameWordsPerMinute / 2);
  }, [gameWordsPerMinute]);

  return (
    <GameContext.Provider
      value={{
        selectedTexts,
        text,
        level,
        totalWordsPerMinute,
        gameWordsPerMinute,
        nextLevelClick,
        calculateGameWordsPerMinute,
        selectTexts,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export const useGame = () => useContext(GameContext);

export default GameProvider;
