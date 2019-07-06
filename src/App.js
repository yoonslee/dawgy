import React, { useState } from "react";
import { Router } from "@reach/router";
import uuidv4 from "uuid/v4";
import startCase from "lodash/startCase";

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

import useInterval from "./hooks/useInterval";

const DOGS = [
  "https://images.dog.ceo/breeds/whippet/n02091134_18392.jpg",
  "https://images.dog.ceo/breeds/cairn/n02096177_13328.jpg",
  "https://images.dog.ceo/breeds/pointer-germanlonghair/hans3.jpg",
  "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_6936.jpg",
  "https://images.dog.ceo/breeds/pug/n02110958_14179.jpg",
  "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_2778.jpg",
  "https://images.dog.ceo/breeds/terrier-irish/n02093991_4589.jpg",
  "https://images.dog.ceo/breeds/labrador/n02099712_7802.jpg",
  "https://images.dog.ceo/breeds/terrier-tibetan/n02097474_85.jpg",
  "https://images.dog.ceo/breeds/terrier-wheaten/n02098105_3865.jpg",
  "https://images.dog.ceo/breeds/eskimo/n02109961_2532.jpg",
  "https://images.dog.ceo/breeds/shiba/shiba-4.jpg",
  "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_1998.jpg",
  "https://images.dog.ceo/breeds/terrier-irish/n02093991_4872.jpg",
  "https://images.dog.ceo/breeds/mountain-bernese/n02107683_906.jpg",
  "https://images.dog.ceo/breeds/pekinese/n02086079_2358.jpg",
  "https://images.dog.ceo/breeds/germanshepherd/n02106662_16163.jpg",
  "https://images.dog.ceo/breeds/terrier-norwich/n02094258_2730.jpg",
  "https://images.dog.ceo/breeds/cockapoo/bubbles1.jpg",
  "https://images.dog.ceo/breeds/germanshepherd/n02106662_7212.jpg",
  "https://images.dog.ceo/breeds/bulldog-boston/n02096585_4136.jpg",
  "https://images.dog.ceo/breeds/shiba/shiba-13.jpg",
  "https://images.dog.ceo/breeds/saluki/n02091831_304.jpg",
  "https://images.dog.ceo/breeds/vizsla/n02100583_12880.jpg",
  "https://images.dog.ceo/breeds/terrier-norfolk/n02094114_61.jpg",
  "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_13424.jpg",
  "https://images.dog.ceo/breeds/schipperke/n02104365_6395.jpg",
  "https://images.dog.ceo/breeds/briard/n02105251_7579.jpg",
  "https://images.dog.ceo/breeds/keeshond/n02112350_6952.jpg",
  "https://images.dog.ceo/breeds/puggle/IMG_075427.jpg",
  "https://images.dog.ceo/breeds/newfoundland/n02111277_5964.jpg",
  "https://images.dog.ceo/breeds/maltese/n02085936_4192.jpg",
  "https://images.dog.ceo/breeds/chow/n02112137_14255.jpg",
  "https://images.dog.ceo/breeds/spaniel-irish/n02102973_3405.jpg",
  "https://images.dog.ceo/breeds/mexicanhairless/n02113978_605.jpg",
  "https://images.dog.ceo/breeds/poodle-miniature/n02113712_2379.jpg",
  "https://images.dog.ceo/breeds/chow/n02112137_1830.jpg",
  "https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_1943.jpg",
  "https://images.dog.ceo/breeds/shiba/shiba-4.jpg",
  "https://images.dog.ceo/breeds/sheepdog-english/n02105641_2905.jpg",
  "https://images.dog.ceo/breeds/sheepdog-english/n02105641_5980.jpg",
  "https://images.dog.ceo/breeds/pekinese/n02086079_22412.jpg",
  "https://images.dog.ceo/breeds/maltese/n02085936_7253.jpg",
  "https://images.dog.ceo/breeds/terrier-patterdale/patterdale-terrier-287612805105275kBT.jpg",
  "https://images.dog.ceo/breeds/setter-irish/n02100877_5286.jpg",
  "https://images.dog.ceo/breeds/spaniel-japanese/n02085782_2323.jpg",
  "https://images.dog.ceo/breeds/terrier-patterdale/patterdale-terrier-1330018870tnN.jpg",
  "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_9615.jpg",
  "https://images.dog.ceo/breeds/vizsla/n02100583_473.jpg",
  "https://images.dog.ceo/breeds/stbernard/n02109525_4516.jpg"
];

const INPUT_KEYS = Object.keys(INPUTS);

const DOGS_OBJS = DOGS.map(d => ({
  id: uuidv4(),
  photo: d,
  breed: startCase(d.split("/breeds/")[1].split("/")[0]).toUpperCase(),
  bio: INPUT_KEYS.map(inputKey => {
    const randomInputKey =
      INPUT_KEYS[Math.floor(Math.random() * INPUT_KEYS.length)];

    return INPUTS[randomInputKey].text;
  }).join(" ")
}));

function App() {
  const [dogs, setDogs] = useState(DOGS_OBJS);
  const [{ showModal, recentMatch }, setModal] = useState(false);

  const [user, setUser] = useState({
    id: DOGS_OBJS[0].id,
    photo: DOGS_OBJS[0].photo,
    gender: "",
    bio: "",
    breed: startCase(
      DOGS_OBJS[0].photo.split("/breeds/")[1].split("/")[0]
    ).toUpperCase(),
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
    console.log("matched");
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

  // useEffect(() => {
  //   fetch("https://dog.ceo/api/breeds/image/random/50")
  //     .then(res => res.json())
  //     .then(({ message, status }) => {
  //       if (status === "success") {
  //         setDogs(message || []);
  //         console.log(setUser);
  //       }
  //     });
  // }, []);

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
              <div className="modal-inner">
                <button
                  onClick={() =>
                    setModal(state => ({ ...state, showModal: false }))
                  }
                >
                  Close
                </button>
                <img src={recentMatch.photo} alt="Your recent match" />
                <img src={user.photo} alt="Your profile" />
                {JSON.stringify(recentMatch)}
              </div>
            </Modal>
          )}
        </div>
      </DogsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
