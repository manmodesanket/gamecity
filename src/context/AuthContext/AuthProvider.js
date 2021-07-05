import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import axios from "axios";
import makeApiCall from "../../server/server.request";
import { navigate } from "@reach/router";

function loginService(uname, pswd) {
  let urlStr = process.env.REACT_APP_API_ROOT_URL + "auth/login";
  let data = {
    uname,
    pswd,
  };
  return makeApiCall({ type: "post", url: urlStr, data });
}

function signupService(uname, pswd) {
  let urlStr = process.env.REACT_APP_API_ROOT_URL + "auth/signup";
  let data = { user: { uname, pswd } };
  return makeApiCall({ type: "post", url: urlStr, data });
}

export const AuthProvider = ({ children }) => {
  const { loggedIn, token: savedToken } = JSON.parse(
    localStorage.getItem("auth")
  ) || {
    loggedIn: false,
    token: null,
  };

  const [token, setToken] = useState(savedToken);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        if (token != null) {
          let urlStr = process.env.REACT_APP_API_ROOT_URL + "auth/user";
          let data = { headers: { authorization: token } };
          const { success, response } = await makeApiCall({
            type: "get",
            url: urlStr,
            data,
          });
          if (success) {
            setUser(response.userID);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token, user]);

  const loginWithCredentials = async (username, password, setError) => {
    try {
      const { success, response } = await loginService(username, password);
      if (success) {
        setToken(response.token);
        setUser(response.username);
        localStorage.setItem(
          "auth",
          JSON.stringify({ loggedIn: true, token: response.token })
        );
      } else {
        setError("email id or password is wrong.");
      }
    } catch (error) {
      setError("something is wrong.");
    }
  };

  const signup = async (username, password, setError) => {
    try {
      const { success, response } = await signupService(username, password);
      if (success) {
        const { token, user } = response;
        navigate("../login");
      } else {
        setError("something is wrong.");
      }
    } catch (error) {
      setError("something is wrong.");
    }
  };

  function logout() {
    setToken(null);
    setUser(null);
    localStorage?.removeItem("auth");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loginWithCredentials,
        signup,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
