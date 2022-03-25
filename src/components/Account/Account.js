import React from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";

const Account = () => {
  const { user, logout, displayName } = useAuth();
  function logoutHandler() {
    user ? logout() : null;
  }

  return (
    <div>
      <div className="main-page">
        <div className="user_info">
          <div className="user_info__username">
            <div>Hello {displayName}</div>
          </div>
          <button className="btn form__submit__btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
