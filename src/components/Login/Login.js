import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { navigate } from "@reach/router";
import axios from "axios";

const Login = () => {
  const { isUserLoggedIn, loginWithCredentials, logout } = useAuth();
  let { token, isUserLoggrdIn, setLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    isUserLoggedIn ? logout() : loginWithCredentials(username, password);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginHandler();
  };

  useEffect(() => {
    (async function () {
      try {
        if (token != null) {
          const response = await axios.get(
            "https://buygames-backend.manmodesanket.repl.co/auth/user",
            { headers: { authorization: token } }
          );
          console.log(response);
          if (response.data.token != null) {
            setLogin(true);
          } else {
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
