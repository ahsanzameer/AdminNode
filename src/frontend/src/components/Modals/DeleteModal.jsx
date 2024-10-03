import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteModal = ({ open, onclose, title, SubTitle, onYes }) => {
  return (
    <Dialog
      open={open}
      onClose={onclose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        className="dark:bg-boxdark-2 dark:text-bodydark"
      >
        {title}
      </DialogTitle>
      <DialogContent className="dark:bg-boxdark-2 dark:text-bodydark">
        <DialogContentText
          id="alert-dialog-description"
          className="dark:bg-boxdark-2 dark:text-bodydark"
        >
          {SubTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dark:bg-boxdark-2 dark:text-bodydark">
        <Button onClick={onYes}>Yes</Button>
        <Button onClose={onclose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
