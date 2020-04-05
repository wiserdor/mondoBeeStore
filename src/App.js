import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import 'react-toastify/dist/ReactToastify.css';

import Catalog from "./components/Catalog";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" align="center" style={{padding:10,textAlign:"center"}}>
      <Grid item xs={12}>
        <Typography variant="h3" style={{textAlign:"center"}} component="h2">
          החנות של מונדו
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" component="h4" style={{ marginBottom: 40 }}>
         מבחר רב של פירות העונה המשתנים בהתאם לסחורה בשוק.
         לפרטים נוספים התקשרו: מונדו 054-3300800
        </Typography>
        </Grid>
        <Catalog />
      </Container>
    </div>
  );
}

export default App;
