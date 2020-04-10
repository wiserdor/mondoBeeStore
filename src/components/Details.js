import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

export default function Details({ cart }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const mailTo = "Adigolan0910@gmail.com";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendEmail = async () => {
    if (name && address && phone) {
      try {
        let a = await Axios.post("/api/send", {
          cart: cart,
          details: { name, phone, address },
        });
        window.alert(
          "תודה שהזמנתם מהחנות של מונדו! ניצור איתכם קשר בהקדם, התשלום  המדוייק יהיה בהתאם למשקל וישלח אליכם ברגע שההזמנה מוכנה. התשלום במזומן או ביט לטלפון 054-3300801"
        );

        window.location.reload();
      } catch {
        toast.error("תקלה בעת השליחה, אנא נסה שנית", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    } else {
      toast.error("נא למלא את כל הפרטים", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        onClick={handleClickOpen}
      >
        בצע הזמנה
      </Button>
      <Dialog
        open={open}
        scroll="body"
        onClose={handleClose}
        aria-labelledby="form-dialog-title" 
      >
        <DialogContent style={{ textAlign: "center" }}>
        <Typography variant="h6" id="cart">
          פרטי משלוח
        </Typography>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="שם מלא"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            label="כתובת"
            type="address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            id="phone"
            label="טלפון"
            fullWidth
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            בטל
          </Button>
          <Button
            onClick={() => {
              sendEmail();
            }}
            color="primary"
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
