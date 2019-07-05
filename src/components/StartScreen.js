import React, { useContext } from "react";
import {
  navigate
  // Redirect
} from "@reach/router";

import UserContext from "../contexts/UserContext";

function StartScreen() {
  const [user, setUser] = useContext(UserContext);

  // if (user.created) {
  //   return navigate("/explore");
  // }

  return (
    <div id="startScreen">
      <div>Welcome to Dawgy!</div>
      {JSON.stringify(user, null, 4)}
      <div>
        {user.photo ? <img src={user.photo} alt="Your profile" /> : null}
      </div>

      <div id="selectGender">
        <button onClick={() => setUser(user => ({ ...user, gender: "M" }))}>
          M
        </button>

        <button onClick={() => setUser(user => ({ ...user, gender: "F" }))}>
          F
        </button>
      </div>

      <div>
        <input
          value={user.bio}
          onChange={e => {
            const value = e.target.value;
            setUser(user => ({ ...user, bio: value }));
          }}
        />
      </div>

      <div>
        <button
          onClick={() => {
            let isValid = true;

            if (isValid) {
              setUser(user => ({ ...user, created: true }));
              navigate("/explore");
            }
          }}
        >
          Create Profile
        </button>
      </div>

      <div>Platinum</div>
    </div>
  );
}

export default StartScreen;
