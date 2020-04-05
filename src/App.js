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
      
        maxWidth="sm"
        align="center"
        style={{ textAlign: "center" }}
      >
      <img src={logo} className="logo-background"/>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h4" >
            מבחר רב של פירות העונה המשתנים בהתאם לסחורה בשוק 
          </Typography>
          <Typography variant="h6" component="h5" style={{ marginBottom: 40 }}>
            משלוחים לישובי לב השרון, תל מונד,קדימה-צורן ואבן יהודה
          </Typography>
        </Grid>
        <Catalog />
      </Container>
    </div>
  );
}

export default App;
