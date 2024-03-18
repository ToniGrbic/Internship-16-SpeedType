import { createContext, useContext, useState, useRef, useEffect } from "react";

const defaultContext = {
  isRunning: false,
  elapsedTime: 0,
  startClock: () => {},
  stopClock: () => {},
  resetClock: () => {},
  formatTime: () => {},
};

const StopWatchContext = createContext(defaultContext);

const StopWatchProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1000);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const startClock = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stopClock = () => {
    setIsRunning(false);
  };

  const resetClock = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <StopWatchContext.Provider
      value={{
        isRunning,
        elapsedTime,
        startClock,
        stopClock,
        resetClock,
        formatTime,
      }}
    >
      {children}
    </StopWatchContext.Provider>
  );
};

export default StopWatchProvider;

export const useStopWatch = () => {
  return useContext(StopWatchContext);
};
