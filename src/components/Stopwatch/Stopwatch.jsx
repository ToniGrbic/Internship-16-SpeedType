import React from "react";
import { useStopWatch } from "../../providers/StopWatchProvider";
import styles from "./index.module.css";

const Stopwatch = () => {
  const { formatTime } = useStopWatch();

  return (
    <div>
      <div>{formatTime()}</div>
    </div>
  );
};
export default Stopwatch;
