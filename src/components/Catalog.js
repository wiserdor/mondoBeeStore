import React, { useState } from "react";
import ItemCard from "./ItemCard";
import Cart from "./Cart";
import Grid from "@material-ui/core/Grid";

const catalogList = [
  {
    id: 0,
    step: "1.5",
    name: "אבוקדו האס",
    description: "כי אין כמו מצה עם אבוקדו",
    count: 1.5,
    unit: 'ק"ג',
    img_path: "/avocado.jpeg"
  },
  {
    id: 1,
    name: "דבש",
    step: "0.5",
    count: 1,
    price:['קילו: 45 ש"ח ','חצי קילו: 25 ש"ח'],
    unit: 'ק"ג',
    img_path: "/honey.jpeg"
  },
  {
    id: 2,
    name: "אננס",
    count: 1,
    step: "1",
    price:['קטן: 25 ש"ח',' גדול: 35 ש"ח'],
    unit: "יחידות",
    img_path: "/pineapple.jpeg"
  },
  {
    id: 3,
    name: "עגבניות שרי תמר",
    count: 1,
    step: "1",
    unit: "נספק",
    img_path: "/sherry2.jpeg"
  },
  {
    id: 4,
    name: "עגבניות שרי יובל מנומרות",
    count: 1,
    step: "1",
    unit: "נספק",
    img_path: "/shery-tomato1.jpeg"
  },
  {
    id: 5,
    name: "תפוז",
    count: 1,
    step: "5",
    unit: "קילו",
    img_path: "/oranges2.jpeg"
  }
];

const Catalog = () => {
  const [cart, setCart] = useState([]);

  const addToCart = item => {
    if (item.count < 0) return;
    console.log(item);
    console.log(cart.filter(i => i.id !== item.id));

    const newArr = [...cart.filter(i => i.id !== item.id), item];
    setCart(newArr);
  };

  const deleteFromCart = id => {
    setCart(cart.filter(i => i.id !== id));
  };

  return (
    <>
      <Grid container spacing={1}>
        {catalogList.map(c => (
          <Grid key={c.id + "card"} justify="center" align="center" item xs>
            <ItemCard item={c} addToCart={addToCart} />
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
        <Cart cart={cart} deleteFromCart={deleteFromCart} />
      </Grid>
    </>
  );
};

export default Catalog;
