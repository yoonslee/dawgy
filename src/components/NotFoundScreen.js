import React from "react";
import { Link } from "@reach/router";

function NotFoundScreen() {
  return (
    <>
      <Link to="/">Go back</Link>
      <div>404</div>
    </>
  );
}

export default NotFoundScreen;
