import React, { useEffect } from "react";

const Toast = ({ toastMessageList, setToastMessageList }) => {
  return (
    <div>
      {toastMessageList.length > 0
        ? toastMessageList.map((toast, i) => (
            <ToastCard
              key={i}
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

  useEffect(() => {
    const interval = setInterval(() => {
      deleteToast(toastMessageList[0].id);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="toast-wrapper">
      <div className="toast-card">
        <div>{toastObj.message}</div>
        <button
          onClick={() => deleteToast(toastObj.id)}
          className="btn toast__card__btn"
        >
          X
        </button>
      </div>
    </div>
  );
};

export { Toast };
