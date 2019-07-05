import React, { useState, useEffect, useContext } from "react";
import { Router, Link } from "@reach/router";

import UserContext from "./components/UserContext";
import StartScreen from "./components/StartScreen";
import ExploreScreen from "./components/ExploreScreen";

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

function App() {
  const [dogs, setDogs] = useState(DOGS || []);
  const [user, setUser] = useState({
    photo: DOGS[0],
    gender: "",
    bio: "",
    created: false,
    platinum: false,
    platinumExpirationDate: null
  });

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
      <div className="App">
        <Router>
          <StartScreen path="/" />
          <ExploreScreen path="explore" />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
