import React, { useEffect, useState, useReducer, createContext } from "react";
import Axios from "axios";
import storeReducer from "../reducers/cart";
import { catalogList } from "../catalogList";

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [cart, dispatchCart] = useReducer(storeReducer, []);
  const [catalog, setCatalog] = useState([]);
  const [userForAnalytic, setUserForAnalytic] = useState("User "+new Date().toTimeString()+" "+new Date().toLocaleDateString());

  useEffect(() => {
    const init = async () => {
        try{
            const res = await Axios.get("/api/catalog");
            let data = res.data.sort((a,b)=>a.name.localeCompare(b.name))
            if(!data){
                data=catalogList
            }
            data.forEach((i) => i.count = 0);
      
            setCatalog(data);
        }
        catch(err){
            console.log(err)
            let data = catalogList.sort((a,b)=>a.name.localeCompare(b.name))
            data.forEach((i) => i.count = 0);
            setCatalog(data);
        }
      
    };

    init();
  }, []);

  const values = {
    cart,
    dispatchCart,
    catalog,
    userForAnalytic
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};
