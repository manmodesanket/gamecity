import React from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";

const Login = () => {
  const { isUserLoggedIn, loginWithCredentials, logout } = useAuth();

  function loginHandler() {
    isUserLoggedIn ? logout() : loginWithCredentials("sanket", "batata");
  }

  return (
    <div className="main-page">
      <button onClick={() => loginHandler()}>
        {isUserLoggedIn ? "I am logged In" : "I am logged out"}
      </button>
    </div>
  );
};

export { Login };
