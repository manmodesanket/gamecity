import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

import axios from "axios";

function loginService(uname, pswd) {
  console.log("loginService");
  return axios.post(
    "https://buygames-backend.manmodesanket.repl.co/auth/login",
    {
      user: { username: uname, password: pswd },
    }
  );
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
      const response = await loginService(username, password);
      console.log(response);
      if (response.status === 200) {
        setToken(response.data.token);
        setLogin(true);
        localStorage.setItem(
          "auth",
          JSON.stringify({ loggedIn: true, token: response.data.token })
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
      value={{ isUserLoggedIn, token, loginWithCredentials, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
