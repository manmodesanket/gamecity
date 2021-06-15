import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { navigate } from "@reach/router";
import axios from "axios";
import makeApiCall from "../../server/server.request";

const Login = () => {
  const { user, loginWithCredentials, logout, token, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    user ? logout() : loginWithCredentials(username, password);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginHandler();
  };

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
            navigate("../");
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  return (
    <div className="main-page">
      <div className="login-form">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export { Login };
