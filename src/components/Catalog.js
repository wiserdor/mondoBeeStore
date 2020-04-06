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
    name: "דבש חצי קילו",
    step: "1",
    count: 1,
    price: 25,
    priceDisplay: ["חצי קילו: ₪25 "],
    unit: "יחידות",
    img_path: "/honey.jpeg"
  },
  {
    id: 17,
    name: "דבש קילו",
    step: "1",
    count: 1,
    price: 45,
    priceDisplay: ["קילו: ₪45"],
    unit: "יחידות",
    img_path: "/honey.jpeg"
  },
  {
    id: 2,
    name: "אננס קטן",
    count: 1,
    step: "1",
    priceDisplay: ["יחידה: ₪25"],
    unit: "יחידות",
    img_path: "/pineapple.jpeg"
  },
  {
    id: 16,
    name: "אננס גדול",
    count: 1,
    step: "1",
    priceDisplay: ["יחידה: ₪35"],
    unit: "יחידות",
    img_path: "/pineapple.jpeg"
  },
  {
    id: 3,
    name: "עגבניות שרי תמר",
    count: 1,
    step: "1",
    priceDisplay: ["₪19 :קילו"],
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
    count: 5,
    description: 'שקים של 5 ק"ג',
    step: "1",
    unit: "שקים",
    img_path: "/oranges2.jpeg"
  },
  {
    id: 6,
    name: "עגבניות מגי",
    count: 1,
    priceDisplay: ["קילו: ₪19"],
    step: "1",
    unit: "נספק",
    img_path: "/meggie2.jpeg"
  },
  {
    id: 7,
    name: "עגבניות שרי ליקופן",
    count: 1,
    priceDisplay: ["₪19 :קילו"],
    step: "1",
    unit: "נספק",
    img_path: "/default.png"
  },
  {
    id: 8,
    name: "בננות",
    count: 1,
    priceDisplay: [`₪10 :קילו`],
    step: "1",
    unit: "נספק",
    img_path: "/banana.jfif"
  },
  {
    id: 9,
    name: "שסק",
    count: 1,
    priceDisplay: ["₪25 :קילו"],
    step: "1",
    unit: "נספק",
    img_path: "/default.png"
  },
  {
    id: 10,
    name: "לבבות חסה",
    count: 1,
    priceDisplay: ["₪12 :חבילה(2 ראשים)"],
    step: "1",
    unit: "נספק",
    img_path: "/default.png"
  },
  {
    id: 11,
    name: "שמן זית כבישה קרה 1 ליטר",
    count: 1,
    priceDisplay: ["₪48 :יחידה"],
    step: "1",
    unit: "יחדות",
    img_path: "/olive-oil.jfif"
  },
  {
    id: 12,
    name: "שמן זית כבישה קרה 2 ליטר",
    count: 1,
    priceDisplay: ["₪85 :יחידה"],
    step: "1",
    unit: "יחדות",
    img_path: "/olive-oil.jfif"
  },
  {
    id: 13,
    name: "אגס",
    count: 1,
    priceDisplay: ["₪16 :קילו"],
    step: "1",
    unit: "נספק",
    img_path: "/pear.jpeg"
  },
  {
    id: 14,
    name: "תפוח עץ גאלה וסמיט",
    count: 1,
    priceDisplay: ["₪15 :קילו"],
    step: "1",
    unit: "נספק",
    img_path: "/gala.jpeg"
  },
  {
    id: 15,
    name: "תפוח עץ פינק ליידי",
    count: 1,
    priceDisplay: ["₪19 :קילו"],
    step: "1",
    unit: "נספק",
    img_path: "/pink-lady.jpeg"
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

  const isItemInCart = id => {
    return cart.some(i => i.id === id);
  };

  const deleteFromCart = id => {
    setCart(cart.filter(i => i.id !== id));
  };

  return (
    <>
      <Grid container spacing={1}>
        {catalogList.map(c => (
          <Grid key={c.id + "card"} justify="center" align="center" item xs>
            <ItemCard isItemInCart={isItemInCart} item={c} addToCart={addToCart} />
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
        {cart.length ? <Cart cart={cart} deleteFromCart={deleteFromCart} /> : null}
      </Grid>
    </>
  );
};

export default Catalog;
