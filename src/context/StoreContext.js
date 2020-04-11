import React, { useEffect, useState, useReducer, createContext } from "react";
import Axios from "axios";
import storeReducer from "../reducers/cart";
import { catalogList } from "../catalogList";

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [cart, dispatchCart] = useReducer(storeReducer, []);
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await Axios.get("/api/catalog");
      const data = res.data
      data.forEach((i) => i.count = 0);

      setCatalog(data);
    };

    init();
  }, []);

  const values = {
    cart,
    dispatchCart,
    catalog,
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};
