import React, { useContext, useState } from "react";

export const DIALOG = {
  CONFIRMATION: "CONFIRMATION",
  NEW_GAME: "NEW_GAME",
  RESULTS: "RESULTS",
  NEW_LEVEL: "NEW_LEVEL",
};

const defaultContext = {
  activeDialog: null,
  open: () => {},
  close: () => {},
  additionalProps: {},
};

const DialogContext = React.createContext(defaultContext);

const DialogProvider = ({ children }) => {
  const [activeDialog, setActiveDialog] = useState(null);
  const [additionalProps, setAdditionalProps] = useState({});

  const open = (dialog, props) => {
    setActiveDialog(dialog);
    setAdditionalProps(props);
  };

  const close = () => {
    setActiveDialog(null);
    setAdditionalProps({});
  };

  return (
    <DialogContext.Provider
      value={{ activeDialog, open, close, additionalProps }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
