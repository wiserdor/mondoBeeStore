import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Axios from "axios";
import { connect } from "node-mailjet";

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

  const sendEmail = () => {
      console.log(cart)
    const mailjet = connect(
      "2c99fdc71852f0d0462f1dba726f3d6e",
      "c6d15935dda204af494e6c026424a816"
    );
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "mondo@bee.com",
            Name: "Mondo"
          },
          To: [
            {
              Email: "vgibsonsg@gmail.com",
              Name: "dor"
            },
            
          ],
          Subject: "הזמנה חדשה ממונדו בי",
          TextPart: "My first Mailjet email",
          HTMLPart: cart.map(
            i => `
          <Title>${name}הזמנה חדשה מ</Title>
          <div><span>${i.name}</span><span>:${i.unit +
              " " +
              i.count}</span></div>
          `
          )
        }
      ]
    });
    request
      .then(result => {
        console.log(result.body);
      })
      .catch(err => {
        console.log(err.statusCode);
      });
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
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="כתובת"
            type="address"
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="טלפון"
            fullWidth
            type="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            בטל
          </Button>
          <Button onClick={sendEmail} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
