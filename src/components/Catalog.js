import React, { useContext, useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Cart from "./Cart";
import Grid from "@material-ui/core/Grid";

import { StoreContext } from "../context/StoreContext";

const Catalog = () => {
  const { catalog, cart, dispatchCart } = useContext(StoreContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToCart = () => {
    const element = document.getElementById("cart");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Grid container spacing={2}>
        {catalog.map((c) => (
          <Grid key={c.id + "card"} justify="center" align="center" item xs>
            <ItemCard item={c} />
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
      ></Grid>
      <Cart />
    </>
  );
};

export default Catalog;
