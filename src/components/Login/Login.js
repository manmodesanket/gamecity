import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import makeApiCall from "../../server/server.request";
import { validateEmail } from "../../Utilities/validation-utils";

const Login = () => {
  const { user, loginWithCredentials, logout, token, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function loginHandler() {
    user ? logout() : loginWithCredentials(username, password, setError);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let isEmailValid = validateEmail(username);
    if (isEmailValid) loginHandler();
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

  return (
    <div className="main-page">
      <div className="login-form__container">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit} className="login__form">
          {error ? <span className="form__error">{error}</span> : null}
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
            type="text"
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
          <div className="form__message">
            <div className="form__message__text form__message__element">
              Don't have account?
            </div>
            <Link
              to="/signup"
              className="form__messsage__link form__message__element"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Login };
