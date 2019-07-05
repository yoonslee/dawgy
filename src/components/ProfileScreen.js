import React, { useContext } from "react";

import Layout from "./Layout";

import UserContext from "../contexts/UserContext";

function ProfileScreen() {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <Layout>
        <div>Profile</div>
        <div>
          {user.photo ? <img src={user.photo} alt="Your profile" /> : null}
        </div>
        <div>{user.breed}</div>
        {/* <div>
          <input
            value={user.bio}
            onChange={e => {
              const value = e.target.value;
              setUser(user => ({ ...user, bio: value }));
            }}
          />
        </div> */}
      </Layout>
    </>
  );
}

export default ProfileScreen;
