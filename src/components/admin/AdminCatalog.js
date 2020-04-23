import React, { useEffect, useState } from "react";
import Axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const AdminCatalog = () => {
  const [catalog, setCatalog] = useState([]);
  useEffect(() => {
    const init = async () => {
      const res = await Axios.get("/api/catalog");
      let data = res.data.sort((a, b) => a.name.localeCompare(b.name));
      setCatalog(data);
    };
    init();
  }, []);
  return (
    <>
      {catalog.map((i) => (
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{i.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Paper>
                <div>
                  <TextField
                    id="filled-basic"
                    label="שם המוצר"
                    value={i.name}
                    //   onInput={(e) => changeCatalogInfo(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="filled-basic"
                    label="מחיר"
                    value={i.price}
                    //   onInput={(e) => changeCatalogInfo(e.target.value)}
                  />
                </div>
              </Paper>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ))}
    </>
  );
};

export default AdminCatalog;
