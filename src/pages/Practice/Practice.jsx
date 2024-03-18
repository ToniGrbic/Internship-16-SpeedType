import React from "react";
import { TextField, Box } from "@mui/material";
const Practice = () => {
  return (
    <Box sx={{ margin: "2rem 0 0 1rem" }}>
      <TextField
        sx={{ width: "90%" }}
        id="outlined-basic"
        label="Practice"
        multiline
        minRows={5}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
      />
    </Box>
  );
};

export default Practice;
