export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "PRODUCT_LIST":
      return action.payload;
    case "ADD_TO_WISHLIST":
      for (let i = 0; i < state.length; i++) {
        if (state[i] === action.payload) return state;
      }
      return [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      const newState = state.filter((item) => item !== action.payload);
      return newState;
    default:
      return state;
  }
};
