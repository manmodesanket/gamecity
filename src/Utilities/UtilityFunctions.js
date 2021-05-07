const createToastMessageList = (msg) => {
  const toastId = Math.floor(Math.random() * 100);
  const obj = {
    id: toastId,
    message: msg,
  };
  return obj;
};

export { createToastMessageList };
