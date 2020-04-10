import React, { useContext, useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Details from "./Details";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const floatStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const { cart, dispatchCart, catalog } = useContext(StoreContext);

  const deleteFromCart = (item) => {
    catalog.find((i) => i.id === item.id).count = 0;
    dispatchCart({ type: "REMOVE_ITEM", item: item });
  };

  const addToCart = (item) => {
    if (item.count < 0) return;
    item.count += item.step;
    if (item.count === item.step) {
      toast.success("הפריט נוסף לעגלה", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      dispatchCart({ type: "ADD_ITEM", item: item });
    } else {
      dispatchCart({ type: "REPLACE_ITEM", item: item });
    }
  };

  const decreaseItemFromCart = (item) => {
    if (item.count === item.step) {
      item.count -= item.step;
      dispatchCart({ type: "REMOVE_ITEM", item: item });
      toast.error("הפריט הוסר מהעגלה", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } else {
      item.count -= item.step;
      dispatchCart({ type: "REPLACE_ITEM", item: item });
    }
  };

  const handleClickOpen = () => {
    if (cart.length !== 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (cart.length === 0) handleClose();
  }, [cart]);

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
      <Fab
        style={floatStyle}
        onClick={handleClickOpen}
        color="secondary"
        aria-label="edit"
      >
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
      <Dialog
        open={open && cart.length !== 0}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
        style={{ textAlign: "center" }}
      >
        <DialogContent style={{paddingRight:1,paddingLeft:1}}>
          <Typography variant="h6" id="cart">
            סיכום הזמנה
          </Typography>
          <List >
            {cart.map((i) => (
              <ListItem style={{padding:0}}>
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
                  <IconButton onClick={() => addToCart(i)} edge="end" aria-label="add">
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => decreaseItemFromCart(i)} edge="end" aria-label="decrease">
                    <RemoveIcon  />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemAvatar style={{ marginRight: "3vh" }}>
                  {"₪" + i.price * i.count}
                  <IconButton style={{marginRight:10}} edge="end" aria-label="delete" onClick={() => {
                        deleteFromCart(i);
                        notify();
                      }}>
                    <DeleteIcon
                      
                    />
                  </IconButton>
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
          ) : null}{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
