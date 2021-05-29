const createToastMessageList = (msg) => {
  const toastId = Math.floor(Math.random() * 100);
  const obj = {
    id: toastId,
    message: msg,
  };
  return obj;
};

const findProductById = (productList, id) => {
  let newGame = productList.find((item) => item._id === id);
  if (newGame != null) {
    return newGame;
  }
};

export { createToastMessageList, findProductById };
