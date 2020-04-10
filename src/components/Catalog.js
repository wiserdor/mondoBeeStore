import React, { useContext, useEffect } from "react";
import ItemCard from "./ItemCard";
import Cart from "./Cart";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { StoreContext } from "../context/StoreContext";
const Catalog = () => {
  const { catalog,cart } = useContext(StoreContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToCart = () => {
    const element = document.getElementById("cart");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const floatStyle = {
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
        {catalog.map((c) => (
          <Grid key={c.id + "card"} justify="center" align="center" item xs>
            <ItemCard
              item={c}
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
          <Cart />
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
