import React from "react";
import { useStopWatch } from "../../providers/StopWatchProvider";
import { Box } from "@mui/material";

const Stopwatch = () => {
  const { formatTime } = useStopWatch();

  return (
    <Box
      sx={{
        fontSize: "1.8rem",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {formatTime()}
    </Box>
  );
};
export default Stopwatch;
