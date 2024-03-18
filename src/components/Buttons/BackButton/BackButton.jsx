import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} color="primary" variant="contained">
      Go back
    </Button>
  );
};

export default BackButton;
