const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return [...action.cart];
    case "ADD_ITEM":
        return [...state, action.item];
    case "REMOVE_ITEM":
      return [...state.filter((i) => i.id !== action.item.id)];
    case "REPLACE_ITEM":
      return [...state.filter((i) => i.id !== action.item.id), action.item];
    default:
      return state;
  }
};

export default cartReducer;
