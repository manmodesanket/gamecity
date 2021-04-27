export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return [...state, action.payload];
    default:
      return state;
  }
};
