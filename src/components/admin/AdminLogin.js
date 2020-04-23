import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";

import { AuthContext } from "../../context/AuthContext";
import Axios from "axios";

const AdminLogin = ({ token, setToken }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    try {
      Axios.post("/api/admin/auth", { password: password }).then((req) => {
        setToken(req.data.token);
      });
    } catch (err) {
      console.log(err);
    }finally{
        event.preventDefault();
    }
  };

  if (token)
    return (
      <Redirect
        to={{
          pathname: "/admin/main",
        }}
      />
    );
  if (!token)
    return (
        <Container>

      <Paper style={{ textAlign: "center" }}>
        <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <TextField
              id="filled-basic"
              label="סיסמא"
              variant="filled"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="submit" variant="contained" color="primary">
              הכנס
            </Button>
          </div>
        </form>
      </Paper>
      </Container>
    );
};

export default AdminLogin;
