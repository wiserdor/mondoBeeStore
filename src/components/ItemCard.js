import React from "react";
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

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 280,
    minWidth: 280,
  },
  media: {
    height: 220,
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



const ItemCard = ({ item, addToCart, decreaseItemFromCart, cart }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={item.img_path}
          title={item.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            style={{ height: 50 }}
          >
            {item.name}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {item.description || ""}
          </Typography>
        </CardContent>
        <CardActions
          style={{ backgroundColor: "beige", justifyContent: "flex-end" }}
        >
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={(e) => {
              addToCart(item);
            }}
          >
            <AddIcon />
          </Fab>
          <Typography style={{ marginLeft: 8, marginRight: 8 }}>
            {cart.find(i=>i.id===item.id)?cart.find(i=>i.id===item.id).count : 0}
          </Typography>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={(e) => {
                decreaseItemFromCart(item);
            }}
          >
            <RemoveIcon />
          </Fab>
          <Typography style={{ marginRight: "auto" }}>
            {(item.price ? `₪${item.price} / ` : "") +
              item.unitCount +
              " " +
              item.unit}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default ItemCard;
