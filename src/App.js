import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Catalog from "./components/Catalog";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Grid container align="center" style={{padding:10,textAlign:"center"}}>
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
      </Grid>
    </div>
  );
}

export default App;
