import { Redirect } from "@reach/router";
import React from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";

const Privateroute = ({ Component, path }) => {
  const { loggedIn } = useAuth();
  if (loggedIn) {
    return <Component path={path} />;
  } else {
    return <Redirect from={path} to="../login" noThrow />;
  }
};

export default Privateroute;
