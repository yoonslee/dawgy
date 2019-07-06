import React, { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";

import Layout from "./Layout";

import DogsContext from "../contexts/DogsContext";
import UserContext from "../contexts/UserContext";

import like from "../images/like.svg";
import skip from "../images/skip.svg";
import triangle from "../images/triangle.svg";

function ExploreScreen() {
  const [dogs] = useContext(DogsContext);
  const [user, setUser] = useContext(UserContext);
  const [showCard, setShowCard] = useState(true);

  function likeDog(id) {
    // const MATCH_RATE_INCREMENT = 0.01;

    // copy dogs array
    const copyOfLikes = [...user.likes];

    // grab dog by id by finding index in array first
    const likeIndex = copyOfLikes.findIndex(like => like === id);

    // if found, skip; otherwise, push id
    if (likeIndex === -1) copyOfLikes.push(id);
    else return;

    setUser(user => ({
      ...user,
      likes: copyOfLikes,
      matchRate: user.matchRate // + MATCH_RATE_INCREMENT
    }));
    setShowCard(false);
  }

  function skipDog(id) {
    // copy dogs array
    const copyOfSkips = [...user.skips];

    // grab dog by id by finding index in array first
    const skipIndex = copyOfSkips.findIndex(skip => skip === id);

    // if found, skip; otherwise, push id
    if (skipIndex === -1) copyOfSkips.push(id);
    else return;

    setUser(user => ({ ...user, skips: copyOfSkips }));
    setShowCard(false);
  }

  const availableDogs = dogs.filter(
    (d, i) =>
      i !== 0 &&
      user.skips.findIndex(id => id === d.id) === -1 &&
      user.likes.findIndex(id => id === d.id) === -1 &&
      user.matches.findIndex(m => m.id === d.id) === -1
  );

  return (
    <>
      <Layout shallowMode={user.shallowMode}>
        {/* <h2>Explore</h2> */}
        <div>
          {availableDogs.length === 0 ? (
            <div>No more dogs in the area</div>
          ) : (
            <div
              className={`dogCardRow ${user.shallowMode ? "shallowMode" : ""}`}
            >
              <div className="infoPanel">
                <div className="infoPanelGuts">
                  <div>
                    <h3>Bio</h3>
                    <p>{availableDogs[0].bio}</p>
                  </div>
                  <span className="dogCardBreed">{availableDogs[0].breed}</span>
                </div>

                <button
                  id="infoPanelToggle"
                  onClick={() =>
                    setUser(user => ({
                      ...user,
                      shallowMode: !user.shallowMode
                    }))
                  }
                >
                  <img src={triangle} alt="info toggle icon" />
                  <img src={triangle} alt="info toggle icon" />
                  <img src={triangle} alt="info toggle icon" />
                </button>
              </div>

              <CSSTransition
                in={showCard}
                classNames="card"
                timeout={200}
                unmountOnExit
                onExit={() => setShowCard(true)}
              >
                <div
                  className="dogCard"
                  style={{ backgroundImage: `url(${availableDogs[0].photo})` }}
                >
                  <div>
                    <button onClick={() => skipDog(availableDogs[0].id)}>
                      <img src={skip} alt="Skip" />
                    </button>
                    <button onClick={() => likeDog(availableDogs[0].id)}>
                      <img src={like} alt="Like" />
                    </button>
                  </div>
                </div>
              </CSSTransition>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default ExploreScreen;
