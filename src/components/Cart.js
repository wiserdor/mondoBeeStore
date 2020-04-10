import React, { useContext } from "react";
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
import { StoreContext } from "../context/StoreContext";

const Cart = () => {
  const { cart, dispatchCart, catalog } = useContext(StoreContext);

  const deleteFromCart = (item) => {
    catalog.find((i) => i.id === item.id).count = 0;
    dispatchCart({ type: "REMOVE_ITEM", item: item });
  };

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
                      deleteFromCart(i);
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
            <small>*ייתכנו שינויים קלים במחיר בהתאם למשקל</small>
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
