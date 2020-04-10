const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return [...action.cart];
    case "ADD_ITEM":
        return [...state, action.item].sort((a,b)=>a.name.localeCompare(b.name));
    case "REMOVE_ITEM":
      return [...state.filter((i) => i.id !== action.item.id)].sort((a,b)=>a.name.localeCompare(b.name));
    case "REPLACE_ITEM":
      return [...state.filter((i) => i.id !== action.item.id), action.item].sort((a,b)=>a.name.localeCompare(b.name));
    default:
      return state;
  }
};

export default cartReducer;
