export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === action.payload._id) return state;
      }

      return [...state, action.payload];
    default:
      return state;
  }
};
