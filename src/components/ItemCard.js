import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CreateIcon from "@material-ui/icons/Create";
import { ToastContainer, toast } from "react-toastify";
import ReactGA from "react-ga";
import Divider from "@material-ui/core/Divider";

import lightGreen from "@material-ui/core/colors/lightGreen";
import grey from "@material-ui/core/colors/grey";

import clsx from "clsx";

import { StoreContext } from "../context/StoreContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    minWidth: 300,
  },
  media: {
    height: 230,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const ItemCard = ({ item }) => {
  const classes = useStyles();
  const { cart, dispatchCart, userForAnalytic, maintenanceMode } = useContext(StoreContext);

  const addToCart = (item) => {
    if (item.count < 0) return;
    item.count += item.count_step;
    if (item.count === item.count_step) {
      ReactGA.event({
        category: userForAnalytic,
        action: "Added to cart " + item.name,
      });
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
    if (item.count <= 0) return;
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

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={item.img_path ? "images" + item.img_path : "/default.png"}
          title={item.name}
        />
        <CardContent>
          <Typography variant="h5" component="h3">
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ minHeight: 20 }}
          >
            {item.description || ""}
          </Typography>
          {!maintenanceMode ? (
            <Typography style={{ marginTop: 10 }}>
              {(item.price ? `₪${item.price} / ` : "") +
                item.unit_count +
                " " +
                item.unit_name}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions
          style={{ backgroundColor: "beige", justifyContent: "center" }}
        >
          <Fab
            style={{ backgroundColor: lightGreen[500] }}
            aria-label="add"
            size="small"
            onClick={(e) => {
              addToCart(item);
            }}
          >
            <AddIcon style={{ color: "white" }} />
          </Fab>
          <Typography style={{ marginLeft: 8, marginRight: 8 }}>
            {cart.find((i) => i.id === item.id)
              ? cart.find((i) => i.id === item.id).count
              : 0}
          </Typography>
          <Fab
            disabled={cart.find((i) => i.id === item.id) ? "" : "true"}
            color="primary"
            style={{
              backgroundColor: cart.find((i) => i.id === item.id)
                ? grey[900]
                : null,
            }}
            aria-label="subtract"
            size="small"
            onClick={(e) => {
              decreaseItemFromCart(item);
            }}
          >
            <RemoveIcon style={{ color: "white" }} />
          </Fab>
        </CardActions>
      </Card>
      <Divider style={{ marginTop: 20 }} />
    </>
  );
};

export default ItemCard;
