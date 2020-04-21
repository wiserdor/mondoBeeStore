import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import { StoreProvider } from "../context/StoreContext";

import Catalog from "./Catalog";
import logo from "../resources/logo.jpeg";
import "typeface-roboto";

const Main = () => {
  return (
    <>
      <StoreProvider>
        <Container
          id="mainContainer"
          maxWidth="md"
          align="center"
          style={{ textAlign: "center", paddingBottom: 70 }}
        >
          <img src={logo} className="logo-background" />
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" style={{ marginTop: 20 }}>
              מבחר רב של פירות העונה המתעדכנים באופן יום יומי בהתאם לסחורה בשוק
            </Typography>
            <Typography variant="h6" component="h4" style={{ color: "red" }}>
              משלוחים לישובי לב השרון, תל מונד,קדימה-צורן ואבן יהודה בלבד,
            </Typography>

            <Typography
              variant="h6"
              component="h4"
              style={{ marginBottom: 20, color: "red" }}
            >
              משלוחים עבור ישובים מרוחקים יינתנו עבור הזמנות מרוכזות.
            </Typography>
          </Grid>
          <Divider style={{ marginBottom: 40 }} />
          <Catalog />
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </Container>
      </StoreProvider>
    </>
  );
};

export default Main;
