import React from "react";
import { Link } from "@reach/router";

function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      {children}
    </div>
  );
}

export default Layout;
