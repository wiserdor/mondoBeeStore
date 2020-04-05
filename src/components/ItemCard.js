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
import { ToastContainer, toast } from "react-toastify";

import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 250
  },
  media: {
    height: 170
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  }
}));
const notify = () =>
  toast.success("הפריט נוסף לעגלה", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false
  });

const ItemCard = ({ item, addToCart }) => {
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
          {item.price &&
            item.price.map(p => (
              <Typography variant="body2" component="p">
                {p}
              </Typography>
            ))}
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description || ""}
          </Typography>
        </CardContent>
        <CardActions style={{backgroundColor:'beige'}}>
          <TextField
            label=""
            style={{ maxWidth: 160 }}
            type="number"
            id="standard-start-adornment"
            defaultValue={item.count}
            onChange={e => (item.count = parseInt(e.target.value))}
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{item.unit}</InputAdornment>
              ),
              inputProps: {
                step: item.step,
                min: "0"
              }
            }}
          />
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={e => {
              addToCart(item);
              notify();
            }}
          >
            <AddIcon />
          </Fab>
        </CardActions>
      </Card>
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
    </>
  );
};

export default ItemCard;
