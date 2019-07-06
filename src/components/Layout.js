import React from "react";
import { Link } from "@reach/router";

import { LINKS } from "../data/links";

function Layout({ children }) {
  return (
    <div className="layout">
      <nav>
        {Object.keys(LINKS).map(linkKey => (
          <Link
            key={linkKey}
            getProps={({ isCurrent }) =>
              isCurrent ? { className: "active" } : null
            }
            to={LINKS[linkKey].link}
          >
            <div className="iconContainer">icon</div>
            {LINKS[linkKey].text}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
