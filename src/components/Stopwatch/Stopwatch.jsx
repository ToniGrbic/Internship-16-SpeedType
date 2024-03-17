import React from "react";
import { useStopWatch } from "../../providers/StopWatchProvider";
import styles from "./index.module.css";

const Stopwatch = () => {
  const { elapsedTime } = useStopWatch();

  const formatTime = () => {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
    </div>
  );
};
export default Stopwatch;
