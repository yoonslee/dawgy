import React from "react";
import { Link, Location } from "@reach/router";

import { LINKS } from "../data/links";
import logo from "../images/dawgy-inverse.svg";

function Layout({ children, shallowMode }) {
  return (
    <Location>
      {({ location }) => {
        const isRootPath = location.pathname === "/" ? true : false;

        return (
          <div className={`layout ${shallowMode ? "shallowMode" : ""}`}>
            <nav>
              <div>
                <img src={logo} alt="Dawgy logo" />
                {Object.keys(LINKS).map(linkKey => {
                  const { link, text, secondary, icon } = LINKS[linkKey];

                  return (
                    <Link
                      key={linkKey}
                      className={`${isRootPath ? "root" : ""} ${
                        secondary ? "secondary" : ""
                      }`}
                      getProps={({ isCurrent }) =>
                        isCurrent
                          ? {
                              className: secondary
                                ? "secondary active"
                                : "active"
                            }
                          : null
                      }
                      onClick={e => {
                        if (isRootPath) {
                          e.preventDefault();
                        }
                      }}
                      to={link}
                      disabled={isRootPath}
                    >
                      {!secondary && (
                        <div className="iconContainer">
                          <img src={icon} alt={`${text} link icon`} />
                        </div>
                      )}
                      {text}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <main>{children}</main>
          </div>
        );
      }}
    </Location>
  );
}

export default Layout;
