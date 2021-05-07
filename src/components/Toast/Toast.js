import React from "react";

const Toast = ({ toastMessageList, setToastMessageList }) => {
  return (
    <div>
      {toastMessageList.length > 0
        ? toastMessageList.map((toast) => (
            <ToastCard
              toastObj={toast}
              key={toast.id}
              setToastMessageList={setToastMessageList}
              toastMessageList={toastMessageList}
            />
          ))
        : null}
    </div>
  );
};

const ToastCard = ({ toastObj, setToastMessageList, toastMessageList }) => {
  const deleteToast = (id) => {
    const index = toastMessageList.findIndex((e) => e.id === id);
    toastMessageList.splice(index, 1);
    setToastMessageList([...toastMessageList]);
  };
  return (
    <div className="toast-card">
      <div>{toastObj.message}</div>
      <button onClick={() => deleteToast(toastObj.id)}>X</button>
    </div>
  );
};

export { Toast };
