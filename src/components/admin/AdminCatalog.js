import React, { useEffect, useState } from "react";
import Axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import EditItem from "./EditItem";

const AdminCatalog = ({ token }) => {
  const [catalog, setCatalog] = useState([]);
  useEffect(() => {
    const init = async () => {
      const res = await Axios.get("/api/catalog");
      let data = res.data.sort((a, b) => a.name.localeCompare(b.name));
      setCatalog(data);
    };
    init();
  }, []);

  const refresh = async () => {
    const res = await Axios.get("/api/catalog");
    let data = res.data.sort((a, b) => a.name.localeCompare(b.name));
    setCatalog(data);
  };

  const deleteItem = async (item) => {
    const payload = {
      id: item.id,
    };
    await Axios.post("/api/catalog/delete", payload, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    refresh();
  };

  return (
    <>
      <Container>
      <EditItem item={{}} title="הוסף פריט" token={token} />
      <Divider style={{marginTop:20}} />
      {catalog.map((i) => (
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{i.name + " "}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <EditItem title="ערוך" item={i} token={token} />
              <Button
                onClick={()=>deleteItem(i)}
                style={{
                  marginRight: 50,
                  color: "white",
                  backgroundColor: "red",
                }}
              >
                מחק
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ))}
      </Container>
    </>
  );
};

export default AdminCatalog;
