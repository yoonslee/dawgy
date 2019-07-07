import React, { useContext } from "react";
import { Link, Location } from "@reach/router";

import { LINKS } from "../data/links";
import logo from "../images/dawgy-inverse.svg";

import UserContext from "../contexts/UserContext";

function Layout({ children, shallowMode, isMatchesScreen }) {
  const [user] = useContext(UserContext);

  return (
    <Location>
      {({ location }) => {
        const isRootPath = location.pathname === "/" ? true : false;

        return (
          <div
            className={`layout ${shallowMode ? "shallowMode" : ""} ${
              isMatchesScreen ? "isMatchesScreen" : ""
            }`}
          >
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

                          {text === "Matches" && user.matches.length > 0 && (
                            <span>{user.matches.length}</span>
                          )}
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
