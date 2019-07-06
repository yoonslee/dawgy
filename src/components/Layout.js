import React from "react";
import { Link, Location } from "@reach/router";

import { LINKS } from "../data/links";
import logo from "../images/dawgy-inverse.svg";

function Layout({ children }) {
  return (
    <Location>
      {({ location }) => {
        const isRootPath = location.pathname === "/" ? true : false;

        return (
          <div className="layout">
            <nav>
              <img src={logo} alt="Dawgy logo" />
              {Object.keys(LINKS).map(linkKey => (
                <Link
                  key={linkKey}
                  className={`${isRootPath ? "root" : ""}`}
                  getProps={({ isCurrent }) =>
                    isCurrent ? { className: "active" } : null
                  }
                  onClick={e => {
                    if (isRootPath) {
                      e.preventDefault();
                    }
                  }}
                  to={LINKS[linkKey].link}
                  disabled={isRootPath}
                >
                  <div className="iconContainer">icon</div>
                  {LINKS[linkKey].text}
                </Link>
              ))}
            </nav>
            <main>{children}</main>
          </div>
        );
      }}
    </Location>
  );
}

export default Layout;
