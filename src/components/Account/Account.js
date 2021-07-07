import { navigate } from "@reach/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import makeApiCall from "../../server/server.request";

const Account = () => {
  const { user, logout, token, setUser, displayName } = useAuth();
  function logoutHandler() {
    user ? logout() : null;
  }
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

          if (!success) {
            setUser(response.userID);
            navigate("../");
          }
        } else if (token == null || user == null) {
          navigate("../login");
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token, user]);
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
