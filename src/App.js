import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Catalog from "./components/Catalog";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Grid container style={{padding:10}}>
        <Typography variant="h3" component="h2">
          החנות של מונדו
        </Typography>
        <Typography variant="h6" component="h4" style={{ marginBottom: 40 }}>
         מבחר רב של פירות העונה המשתנים בהתאם לסחורה בשוק.
         לפרטים נוספים התקשרו: מונדו 054-3300800
        </Typography>
        <Catalog />
      </Grid>
    </div>
  );
}

export default App;
