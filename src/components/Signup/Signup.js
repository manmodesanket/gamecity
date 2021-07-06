import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { navigate } from "@reach/router";
import axios from "axios";
import makeApiCall from "../../server/server.request";
import { validateEmail } from "../../Utilities/validation-utils";

const Signup = () => {
  const { user, signup, token, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const inputEl = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let isEmailValid = validateEmail(username);
    if (isEmailValid) signup(username, password, displayName, setError);
    else setError("please enter valid email.");
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

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="main-page">
      <div className="login-form__container">
        <form onSubmit={handleSubmit} className="login__form">
          <h2>Signup Form</h2>
          {error ? <span className="form__error">{error}</span> : null}
          <label className="form__label form__element">First Name:</label>
          <input
            type="text"
            ref={inputEl}
            value={displayName}
            className="form__input form__element"
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="First name"
          />
          <label className="form__label form__element">Email:</label>
          <input
            type="text"
            value={username}
            className="form__input form__element"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter email here"
          />
          <label className="form__label form__element">Password:</label>
          <input
            type="password"
            value={password}
            className="form__input form__element"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password here"
          />
          <input
            type="submit"
            value="Submit"
            className="btn form__submit__btn form__element"
          />
        </form>
      </div>
    </div>
  );
};

export { Signup };
