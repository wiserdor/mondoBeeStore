import React, { useState } from "react";
import ItemCard from "./ItemCard";
import Cart from "./Cart";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import { catalogList } from "../catalogList";
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const Catalog = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    if (item.count < 0) return;
    if (item.count === 0)
      toast.success("הפריט נוסף לעגלה", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    item.count += item.step;
    const newArr = [...cart.filter((i) => i.id !== item.id), item];
    setCart(newArr);
  };

  const decreaseItemFromCart = (item) => {
    if (item.count <= 0) return;
    if (item.count === item.step) {
      item.count -= item.step;
      setCart(cart.filter((i) => i.id !== item.id));
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
      const newArr = [...cart.filter((i) => i.id !== item.id), item];
      setCart(newArr);
    }
  };

  const isItemInCart = (id) => {
    return cart.some((i) => i.id === id);
  };

  const scrollToCart = () => {
    const element = document.getElementById("cart");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const deleteFromCart = (id) => {
    catalogList.find((i) => i.id === id).count = 0;
    setCart(cart.filter((i) => i.id !== id));
  };

  const floatStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const chipFloatStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <>
      <Grid container spacing={2}>
        {catalogList.map((c) => (
          <Grid key={c.id + "card"} justify="center" align="center" item xs>
            <ItemCard
              decreaseItemFromCart={decreaseItemFromCart}
              item={c}
              cart={cart}
              addToCart={addToCart}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        style={{ marginTop: 40, textAlign: "center" }}
        justify="center"
        align="center"
      >
        {cart.length ? (
          <Cart cart={cart} deleteFromCart={deleteFromCart} />
        ) : null}
      </Grid>
      <Fab
        style={floatStyle}
        onClick={scrollToCart}
        color="secondary"
        aria-label="edit"
      >
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
    </>
  );
};

export default Catalog;
