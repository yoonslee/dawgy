import React, { useContext } from "react";

import UserContext from "./UserContext";

function StartScreen() {
  const [user, setUser] = useContext(UserContext);

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
          onChange={e => {
            const value = e.target.value;
            setUser(user => ({ ...user, bio: value }));
          }}
        />
      </div>

      <div>
        <button
          onClick={() => {
            setUser(user => ({ ...user, created: true }));
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
