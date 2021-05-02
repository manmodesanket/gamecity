export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "PRODUCT_LIST":
      const initialState = [...action.payload];
      return initialState;
    case "PRODUCT_LIST_ASCENDING":
      state.sort((a, b) => (a.price > b.price ? 1 : -1));
      const ascPriceState = [...state];
      return ascPriceState;
    case "PRODUCT_LIST_DESCENDING":
      state.sort((a, b) => (a.price < b.price ? 1 : -1));
      const descPriceState = [...state];
      return descPriceState;
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
