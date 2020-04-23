import React, { useState, useContext } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Redirect } from "react-router-dom";
import { Paper } from "@material-ui/core";
import OrdersPage from "./OrdersPage";
import AdminCatalog from "./AdminCatalog"
import Container from "@material-ui/core/Container";


const AdminMain = ({ token }) => {
  const [file, setFile] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", file);
    axios.post("/api/admin/upload", data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
  };
  return (
    <Container>
      {token ? (
        <>
          <Tabs>
            <TabList>
              <Tab>הזמנות</Tab>
              <Tab>קטלוג</Tab>
              <Tab>העלה תמונה</Tab>
            </TabList>
            <TabPanel>
              <Paper style={{ textAlign: "center" }}>
                <OrdersPage token={token} />
              </Paper>
            </TabPanel>
            <TabPanel>
            <AdminCatalog token={token} />
            </TabPanel>
            <TabPanel>
              <Paper style={{ textAlign: "center" }}>
                <input
                  id="myInput"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={uploadImage}>Send</button>
              </Paper>
            </TabPanel>
          </Tabs>
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/admin/login",
          }}
        />
      )}
      </Container>
  );
};

export default AdminMain;
