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
import Mailgun from "mailgun-js";

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
    const API_KEY = process.env.ENV_VARIABLE["MAILGUN_API_KEY"];
    const domain = process.env.ENV_VARIABLE["MAILGUN_DOMAIN"];
    const data = {
      from: "mondo@bee.com",
      to: "vgibsonsg@gmail.com",
      subject: "הזמנה חדשה ממונדו בי",
      html:
        `<div>
        שם: ${name}
        כתובת: ${address}
        טלפון: ${phone}
        </div>` + cart
    };
    var mailgun = new Mailgun({ apiKey: API_KEY, domain: domain });

    mailgun.messages().send(data, function(err, body) {
      //If there is an error, render the error page
      // if (err) {
      //     res.render('error', { error : err});
      //     console.log("got an error: ", err);
      // }
      // //Else we can greet    and leave
      // else {
      //     //Here "submitted.jade" is the view file for this landing page
      //     //We pass the variable "email" from the url parameter in an object rendered by Jade
      //     res.render('submitted', { email : req.params.mail });
      //     console.log(body);
      // }
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
