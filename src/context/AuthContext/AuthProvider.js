import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

import axios from "axios";
import makeApiCall from "../../server/server.request";

function loginService(uname, pswd) {
  console.log("loginService");
  let urlStr = process.env.REACT_APP_API_ROOT_URL + "auth/login";
  let data = {
    uname,
    pswd,
  };
  return makeApiCall({ type: "post", url: urlStr, data });
}

export const AuthProvider = ({ children }) => {
  const { loggedIn, token: savedToken } = JSON.parse(
    localStorage.getItem("auth")
  ) || {
    loggedIn: false,
    token: null,
  };

  const [isUserLoggedIn, setLogin] = useState(loggedIn);
  const [token, setToken] = useState(savedToken);

  const loginWithCredentials = async (username, password) => {
    try {
      const { success, response } = await loginService(username, password);
      console.log(response);
      if (success) {
        setToken(response.token);
        setLogin(true);
        localStorage.setItem(
          "auth",
          JSON.stringify({ loggedIn: true, token: response.token })
        );
      }
    } catch (error) {
      console.log("galat hai", error);
    }
  };

  function logout() {
    setLogin(false);
    setToken(null);
    localStorage?.removeItem("auth");
  }

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, token, loginWithCredentials, logout, setLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
