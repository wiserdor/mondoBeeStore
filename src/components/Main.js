import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import { StoreProvider } from "../context/StoreContext";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

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
            <Typography
              variant="h5"
              component="p"
              style={{ marginTop: 20, fontSize: "1.7rem" }}
            >
              מבחר רב של פירות העונה המתעדכנים באופן יום יומי בהתאם לסחורה בשוק.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              style={{ color: "red", marginTop: 10 }}
            >
              <LocalShippingIcon
                style={{
                  top: 6,
                  position: "relative",
                  color: "black",
                  marginLeft: 5,
                }}
              />
              משלוחים לישובי לב השרון, תל מונד,קדימה-צורן ואבן יהודה בלבד,
            </Typography>
            <Typography
              variant="h6"
              component="h4"
              style={{ marginBottom: 20, color: "red" }}
            >
              משלוחים עבור ישובים מרוחקים יינתנו עבור הזמנות מרוכזות.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              style={{ color: "red", marginTop: 20 }}
            >
              <PaymentIcon
                style={{ top: 6, position: "relative", color: "black" }}
              />
              התשלום במזומן או ביט לטלפון 054-3300801
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
