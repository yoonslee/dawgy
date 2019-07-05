import React, { useContext } from "react";
import { Redirect } from "@reach/router";

import UserContext from "../contexts/UserContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const [user] = useContext(UserContext);

  if (user.created) return <Component {...rest} />;

  return <Redirect to="/" noThrow />;
}

function PublicRoute({ component: Component, ...rest }) {
  return <Component {...rest} />;
}

export { ProtectedRoute, PublicRoute };
