import React from "react";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import NewGameDialog from "./NewGameDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import ResultsDialog from "./ResultsDialog";

const DialogSwitch = () => {
  const { activeDialog, additionalProps, close } = useDialog();

  return (
    <>
      <NewGameDialog
        isOpen={activeDialog === DIALOG.NEW_GAME}
        onClose={close}
        {...additionalProps}
      />
      <ConfirmationDialog
        isOpen={activeDialog === DIALOG.CONFIRMATION}
        onClose={close}
        {...additionalProps}
      />
      <ResultsDialog
        isOpen={activeDialog === DIALOG.RESULTS}
        onClose={close}
        {...additionalProps}
      />
    </>
  );
};

export default DialogSwitch;
