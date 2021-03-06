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
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import ReactGA from "react-ga";
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
  const {
    cart,
    dispatchCart,
    catalog,
    userForAnalytic,
    maintenanceMode,
  } = useContext(StoreContext);

  const deleteFromCart = (item) => {
    catalog.find((i) => i.id === item.id).count = 0;
    dispatchCart({ type: "REMOVE_ITEM", item: item });
  };

  const addToCart = (item) => {
    if (item.count < 0) return;
    item.count += item.count_step;
    if (item.count === item.count_step) {
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
    if (item.count === item.count_step) {
      item.count -= item.count_step;
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
      item.count -= item.count_step;
      dispatchCart({ type: "REPLACE_ITEM", item: item });
    }
  };

  const getTotalCost = () => {
    return cart
      .map((a) =>
        a.price && a.count
          ? a.price * a.count * a.estimate_quantity_per_unit
          : 0
      )
      .reduce((a, b) => a + b, 0);
  };

  const handleClickOpen = () => {
    ReactGA.event({
      category: userForAnalytic,
      action: "Opened cart",
    });
    if (cart.length !== 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (cart.length === 0) handleClose();
  }, [cart]);

  useEffect(() => {}, []);

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
      {maintenanceMode ? (
        ""
      ) : (
        <Chip
          label={"₪" + getTotalCost()}
          variant="outlined"
          style={{
            margin: 0,
            top: "auto",
            right: 75,
            bottom: 30,
            left: "auto",
            backgroundColor: "white",
            position: "fixed",
          }}
        />
      )}
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
        <DialogContent style={{ paddingRight: 1, paddingLeft: 1 }}>
          <Typography variant="h6" id="cart">
            סיכום הזמנה
          </Typography>
          <List>
            {cart.map((i) => (
              <ListItem style={{ padding: 0 }}>
                <ListItemText
                  primary={i.name}
                  secondary={
                    "כמות:" +
                    i.count +
                    " | " +
                    (!maintenanceMode
                      ? i.count * i.unit_count * i.estimate_quantity_per_unit
                      : "") +
                    " " +
                    i.unit_name
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => addToCart(i)}
                    edge="end"
                    aria-label="add"
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => decreaseItemFromCart(i)}
                    edge="end"
                    aria-label="decrease"
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemAvatar style={{ marginRight: "3vh" }}>
                  {!maintenanceMode
                    ? "₪" + i.price * i.count * i.estimate_quantity_per_unit
                    : null}
                  <IconButton
                    style={{ marginRight: 10 }}
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      deleteFromCart(i);
                      notify();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogContent dividers={true} style={{ minHeight: "100px" }}>
          {cart.length ? (
            <div style={{ marginTop: 5, marginBottom: 5 }}>
              {!maintenanceMode ? (
                <>
                  <small>*ייתכנו שינויים קלים במחיר בהתאם למשקל</small>

                  <Typography>
                    סה"כ: ₪
                    {cart
                      .map((a) =>
                        a.price && a.count
                          ? a.price * a.count * a.estimate_quantity_per_unit
                          : 0
                      )
                      .reduce((a, b) => a + b)}
                  </Typography>
                </>
              ) : (
                ""
              )}

              <Details cart={cart} />
            </div>
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
