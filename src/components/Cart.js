import React from "react";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Details from "./Details";
import { ToastContainer, toast } from "react-toastify";

const Cart = ({ cart, deleteFromCart }) => {
  const notify = () =>
    toast.error("הפריט הוסר מהעגלה", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

  return (
    <>
      <Typography variant="h6" id="cart">
        סיכום הזמנה
      </Typography>
      <div>
        <List>
          {cart.map((i) => (
            <ListItem>
              <Typography style={{ marginRight: 35 }}>
                ₪{i.price * i.count}
              </Typography>
              <ListItemText
                primary={i.name}
                secondary={
                  "כמות:" +
                  i.count +
                  " | " +
                  i.count * i.unitCount +
                  " " +
                  i.unit
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon
                    onClick={() => {
                      deleteFromCart(i.id);
                      notify();
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
              <ListItemAvatar>
                <FiberManualRecordIcon
                  style={{ color: "#3f51b5" }}
                ></FiberManualRecordIcon>
              </ListItemAvatar>
            </ListItem>
          ))}
        </List>
        {cart.length ? (
          <>
            <Typography>
              סה"כ: ₪
              {cart
                .map((a) => (a.price && a.count ? a.price * a.count : 0))
                .reduce((a, b) => a + b)}
            </Typography>
            <Details cart={cart} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
