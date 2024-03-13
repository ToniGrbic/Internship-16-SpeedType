import React from "react";
import { useDialog, DIALOG } from "../../providers/DialogProvider";
import NewGameDialog from "./NewGameDialog";
import PracticeDialog from "./PracticeDialog";

const DialogSwitch = () => {
  const { activeDialog, additionalProps, close } = useDialog();

  return (
    <>
      <NewGameDialog
        isOpen={activeDialog === DIALOG.NEW_GAME}
        onClose={close}
        {...additionalProps}
      />
      <PracticeDialog
        isOpen={activeDialog === DIALOG.PRACTICE}
        onClose={close}
        {...additionalProps}
      />
    </>
  );
};

export default DialogSwitch;
