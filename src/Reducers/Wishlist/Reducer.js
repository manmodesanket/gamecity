export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "PRODUCT_LIST":
      return action.payload;
    case "ADD_TO_WISHLIST":
      for (let i = 0; i < state.length; i++) {
        if (state[i] === action.payload) return state;
      }

      return [...state, action.payload];
    default:
      return state;
  }
};
