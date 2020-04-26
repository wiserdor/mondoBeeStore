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
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import Catalog from "./Catalog";
import logo from "../resources/logo.PNG";
import "typeface-roboto";
import "./Main.css";

const Main = () => {
  return (
    <>
      <StoreProvider>
        <img src={logo} className="logo-background" />

        <Container
          id="mainContainer"
          maxWidth="md"
          align="center"
          style={{ textAlign: "center", paddingBottom: 70 }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              component="p"
              style={{
                marginTop: 10,
                fontSize: "1.7rem",
                color: "forestgreen",
                fontWeight: 600,
              }}
            ></Typography>
          </Grid>
          <div className="grid-container" style={{marginBottom:20}}>
            <div className="details-header-grid-item">
              <AlarmOnIcon style={{color:"forestgreen"}} />
              <Typography variant="h6" component="p" style={{ marginTop: 10 }}>
                מבחר רב של פירות וירקות העונה המתעדכנים באופן יום יומי בהתאם
                לסחורה בשוק והמשלוח חינם מהיום להיום.
              </Typography>
            </div>
            <div className="details-header-grid-item">
              <LocalShippingIcon style={{color:"forestgreen"}} />
              <Typography
                variant="h6"
                component="p"
                style={{ marginTop: 10 }}
              ></Typography>
              <Typography
                variant="h6"
                component="p"
                style={{ marginBottom: 20 }}
              >
                משלוחים לישובי לב השרון, תל מונד,קדימה-צורן ואבן יהודה
                בלבד, משלוחים עבור ישובים מרוחקים יינתנו עבור הזמנות מרוכזות.
              </Typography>
            </div>
            <div className="details-header-grid-item">
              <PaymentIcon style={{color:"forestgreen"}}/>

              <Typography variant="h6" component="p" style={{ marginTop: 10 }}>
                התשלום במזומן או ביט לטלפון{" "}
                <span style={{ whiteSpace: "nowrap" }}>054-3300801</span>
              </Typography>
            </div>
          </div>
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
