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
      try {
        const res = await Axios.get("/api/catalog");
        let data = res.data.sort((a, b) => a.id < b.id);
        if (!data) {
          data = catalogList;
        }
        data.forEach((i) => (i.count = 0));

        setCatalog(data);
      } catch (err) {
        console.log(err);
        setCatalog(catalogList);
      }
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
