import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "react-toastify/dist/ReactToastify.css";

import Catalog from "./components/Catalog";
import "./App.css";
import logo from "./resources/logo.jpeg"

function App() {
  return (
    <div className="App">
      <Container
        className=""
        maxWidth="sm"
        align="center"
        style={{ padding: 10, textAlign: "center" }}
      >
      <img src={logo} className="logo-background"/>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h4" style={{ marginBottom: 40 }}>
            מבחר רב של פירות העונה המשתנים בהתאם לסחורה בשוק 
          </Typography>
        </Grid>
        <Catalog />
      </Container>
    </div>
  );
}

export default App;
