import React, { useContext } from "react";

import UserContext from "./UserContext";

function StartScreen() {
  const [photo] = useContext(UserContext);

  return (
    <div id="startScreen">
      <div>Welcome to Dawgy!</div>

      <div>{photo ? <img src={photo} alt="Your profile" /> : null}</div>

      <div id="selectGender">
        <button>M</button>

        <button>F</button>
      </div>

      <div>Platinum</div>
    </div>
  );
}

export default StartScreen;
