import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


export default function Details({ cart }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        בצע הזמנה
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">פרטי משלוח</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="שם מלא"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="כתובת"
            type="address"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="טלפון"
            fullWidth
            type="phone"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            בטל
          </Button>
          <Button onClick={handleClose} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
