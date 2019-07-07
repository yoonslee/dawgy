import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import uuidv4 from "uuid/v4";
import startCase from "lodash/startCase";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import UserContext from "./contexts/UserContext";
import DogsContext from "./contexts/DogsContext";

import { PublicRoute, ProtectedRoute } from "./components/Routes";
import StartScreen from "./components/StartScreen";
import ExploreScreen from "./components/ExploreScreen";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";
import MatchesScreen from "./components/MatchesScreen";
import NotFoundScreen from "./components/NotFoundScreen";
import Modal from "./components/Modal";
import { INPUTS } from "./data/inputHelpers";
import close from "./images/close.svg";

import useInterval from "./hooks/useInterval";

const INPUT_KEYS = Object.keys(INPUTS);

const dogObjectsCreator = dogs => {
  return dogs.map(d => ({
    id: uuidv4(),
    photo: d,
    breed: startCase(d.split("/breeds/")[1].split("/")[0]).toUpperCase(),
    bio: INPUT_KEYS.map(inputKey => {
      const randomInputKey =
        INPUT_KEYS[Math.floor(Math.random() * INPUT_KEYS.length)];

      return INPUTS[randomInputKey].text;
    }).join(" ")
  }));
};

function App() {
  const [dogs, setDogs] = useState([]);
  const [{ showModal, recentMatch }, setModal] = useState(false);

  const [user, setUser] = useState({
    id: "",
    photo: "",
    gender: "",
    bio: "",
    breed: "",
    created: false,
    platinum: false,
    platinumPurchaseDate: null,
    platinumExpirationDate: null,
    likes: [],
    skips: [],
    matches: [],
    matchRate: 1,
    shallowMode: false
  });

  function matchWithLikedDog() {
    // console.log("matched");
    // add the first liked dog to the matches

    // const MATCH_RATE_INCREMENT = 0.01;
    const AUTO_HIDE_MATCH_MODAL_TIMEOUT = 3000;

    const copyOfLikes = [...user.likes];
    const copyOfMatches = [...user.matches];

    const dogIndex = dogs.findIndex(d => d.id === copyOfLikes[0]);

    const { id } = dogs[dogIndex];

    const now = new Date();

    copyOfLikes.shift();
    copyOfMatches.push({
      id,
      conversation: [],
      unmatched: false,
      matchedAt: now,
      updatedAt: now
    });

    setUser(user => ({
      ...user,
      likes: copyOfLikes,
      matches: copyOfMatches,
      matchRate: user.matchRate // - MATCH_RATE_INCREMENT
    }));

    setModal(state => ({
      ...state,
      showModal: true,
      recentMatch: dogs[dogIndex]
    }));

    setTimeout(
      () =>
        setModal(state => ({
          ...state,
          showModal: false,
          recentMatch: {}
        })),
      AUTO_HIDE_MATCH_MODAL_TIMEOUT
    );
  }

  const MATCH_POLLING_FREQUENCY = 2000; // every 2 seconds
  // polling for matches
  useInterval(() => {
    // condition needs to be that the user profile is already created
    if (user.created) {
      // another condition where the user needs to have at least one dog that they LIKED

      if (user.likes.length > 0) {
        // generate random number (0, 1), if less than the matchRate, then we need to add to match
        const rand = Math.random();

        console.log("Polling for matches...");
        console.log(rand, user.matchRate / 10);

        if (rand < user.matchRate / 10) {
          matchWithLikedDog();
        }
      }
    }
  }, MATCH_POLLING_FREQUENCY);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/50")
      .then(res => res.json())
      .then(res => {
        const { message, status } = res;

        if (status === "success") {
          const dawgs = dogObjectsCreator(message);

          setDogs(dawgs || []);

          setUser(user => {
            return {
              ...user,
              id: dawgs[0].id,
              photo: dawgs[0].photo,
              breed: startCase(
                dawgs[0].photo.split("/breeds/")[1].split("/")[0]
              ).toUpperCase()
            };
          });
        }
      });
  }, []);

  // once we get the 50 dog images, we assign the first to ourself into a context object

  return (
    <UserContext.Provider value={[user, setUser]}>
      <DogsContext.Provider value={[dogs, setDogs]}>
        <div className="App">
          <Router>
            <PublicRoute component={StartScreen} path="/" />
            <ProtectedRoute component={ExploreScreen} path="explore" />
            <ProtectedRoute component={ProfileScreen} path="profile" />
            <ProtectedRoute component={SettingsScreen} path="settings" />
            <ProtectedRoute component={MatchesScreen} path="matches" />

            <PublicRoute default component={NotFoundScreen} />
          </Router>
          {showModal && (
            <Modal>
              <div className="modal-inner match">
                <button
                  className="buttonClose"
                  onClick={() =>
                    setModal(state => ({ ...state, showModal: false }))
                  }
                >
                  <img src={close} alt="Close modal" />
                </button>

                <TransitionGroup className="matchRow">
                  {recentMatch && recentMatch.photo && (
                    <CSSTransition
                      appear={true}
                      classNames="left"
                      timeout={400}
                    >
                      <img
                        src={recentMatch.photo}
                        className="dogMatch other"
                        alt="Your recent match"
                      />
                    </CSSTransition>
                  )}
                  <CSSTransition appear={true} classNames="right" timeout={400}>
                    <img
                      src={user.photo}
                      className="dogMatch user"
                      alt="Your profile"
                    />
                  </CSSTransition>
                  <CSSTransition appear={true} classNames="up" timeout={400}>
                    <h2>Matched!</h2>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </Modal>
          )}
        </div>
      </DogsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
