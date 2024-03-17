import { createContext, useContext, useState, useRef, useEffect } from "react";

const defaultContext = {
  isRunning: false,
  elapsedTime: 0,
  start: () => {},
  stop: () => {},
  reset: () => {},
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

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <StopWatchContext.Provider
      value={{ isRunning, elapsedTime, start, stop, reset }}
    >
      {children}
    </StopWatchContext.Provider>
  );
};

export default StopWatchProvider;

export const useStopWatch = () => {
  return useContext(StopWatchContext);
};
